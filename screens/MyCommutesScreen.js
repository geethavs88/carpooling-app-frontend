import { useEffect, useState } from 'react';    
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchRiderBookings, fetchDriverBookings, confirmRide, rejectRide, cancelRide } from '../api/bookings';

const STATUS_COLORS = {
    pending: '#FBBF24',
    confirmed: '#22C55E',
    rejected: '#EF4444',
    cancelled: '#9CA3AF',   
};

const MyCommutesScreen = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('rider');
    const [commutes, setCommutes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCommutes();
    }, [activeTab]);

    const loadCommutes = async () => {
        setLoading(true);
        try {
            const data = activeTab === 'rider' 
                ? await fetchRiderBookings(user.id) 
                : await fetchDriverBookings(user.id);
            setCommutes(data);
        } catch (error) {
            console.error("Error loading commutes:", error);
        } finally {
            setLoading(false);
        }
    };

    const onAccept = async (bookingId) => {
        try {
            await confirmRide(bookingId, user.id);
            setCommutes(prev =>
                prev.map(b =>
                    b.id === bookingId ? { ...b, status: 'confirmed' } : b
                )
            );            
        } catch (error) {
            console.error("Error confirming ride:", error);
        }
    };

    const onReject = async (bookingId) => {
        try {
            await rejectRide(bookingId, user.id);
            setCommutes(prev =>
                prev.map(b =>
                    b.id === bookingId ? { ...b, status: 'rejected' } : b
                )
            );
        } catch (error) {
            console.error("Error rejecting ride:", error);
        }
    };

    const onCancel = async (bookingId) => {
        try {
            await cancelRide(bookingId, user.id);
            setCommutes(prev =>
                prev.map(b =>
                    b.id === bookingId ? { ...b, status: 'cancelled' } : b
                )
            );
        } catch (error) {
            console.error("Error cancelling ride:", error);
        }
    };

    const renderItem = ({ item }) => {
        const isInactive = item.status === 'rejected' || item.status === 'cancelled';
        return (
            <View style={[styles.card, isInactive && styles.disabledCard]}>
                <View style={styles.rowBetween}>
                    <Text style={styles.routeText} numberOfLines={1}>
                        {item.start_location} → {item.end_location}
                    </Text>
                    <View style={[styles.badge, { backgroundColor: STATUS_COLORS[item.status] }]}>
                        <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
                    </View>
                </View>

                <Text style={styles.timeText}>
                    From {new Date(item.earliest_time).toLocaleString()}
                </Text>
                <Text style={styles.timeText}>
                    To {new Date(item.latest_time).toLocaleString()}
                </Text>

                {activeTab === 'driver' && item.status === 'pending' && (
                    <View style={styles.actionsRow}>
                        <TouchableOpacity 
                            style={styles.acceptBtn} 
                            onPress={() => onAccept(item.id)}
                        >
                            <Text style={styles.btnText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.rejectBtn} 
                            onPress={() => onReject(item.id)}
                        >
                            <Text style={styles.btnText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {activeTab === 'rider' && ['pending', 'confirmed'].includes(item.status) && (
                    <TouchableOpacity 
                        style={styles.cancelBtn} 
                        onPress={() => onCancel(item.id)}
                    >
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Commutes</Text>
            </View>

            <View style={styles.tabsRow}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'rider' && styles.activeTab]}
                    onPress={() => setActiveTab('rider')}
                >
                    <Text style={[
                        styles.tabText, 
                        activeTab === 'rider' && styles.activeTabText
                    ]}>
                        As Rider
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'driver' && styles.activeTab]}
                    onPress={() => setActiveTab('driver')}
                >
                    <Text style={[
                        styles.tabText, 
                        activeTab === 'driver' && styles.activeTabText
                    ]}>
                        As Driver
                    </Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <FlatList
                    data={commutes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No commutes yet</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F9FAFB' 
    },

    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },

    tabsRow: { 
        flexDirection: 'row', 
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },

    tab: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        marginHorizontal: 4,
        alignItems: 'center',
    },

    activeTab: { 
        backgroundColor: '#2563EB' 
    },

    tabText: { 
        textAlign: 'center', 
        color: '#6B7280', 
        fontWeight: '600',
        fontSize: 15,
    },

    activeTabText: {
        color: '#FFFFFF',
    },

    listContent: {
        padding: 16,
        flexGrow: 1,
    },

    card: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    disabledCard: { 
        opacity: 0.5 
    },

    rowBetween: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 8,
    },

    routeText: { 
        fontSize: 16, 
        fontWeight: '700',
        color: '#111827',
        flex: 1,
    },

    timeText: { 
        color: '#6B7280', 
        fontSize: 13,
        marginBottom: 4,
    },

    badge: { 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        borderRadius: 6,
        minWidth: 80,
        alignItems: 'center',
    },

    badgeText: { 
        color: '#FFFFFF', 
        fontSize: 10, 
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    actionsRow: { 
        flexDirection: 'row', 
        marginTop: 16,
        gap: 8,
    },

    acceptBtn: {
        flex: 1,
        backgroundColor: '#22C55E',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },

    rejectBtn: {
        flex: 1,
        backgroundColor: '#EF4444',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },

    cancelBtn: {
        backgroundColor: '#EF4444',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
    },

    btnText: { 
        color: '#FFFFFF', 
        fontWeight: '600',
        fontSize: 15,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: { 
        fontSize: 16,
        color: '#6B7280',
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
    },

    emptyText: { 
        fontSize: 16,
        color: '#9CA3AF',
    },
});

export default MyCommutesScreen;