import { useEffect, useState } from 'react';    
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchRiderBookings, fetchDriverBookings, confirmRide, rejectRide,  } from '../api/bookings';


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

    const renderItem = ({ item }) => (
        <View style={[styles.card, item.status !== 'pending' && styles.disabledCard]}>
            <View style={styles.rowBetween}>
                <Text style={styles.routeText}>{item.start_location} → {item.end_location}</Text>
                <View style={[styles.badge, { backgroundColor: STATUS_COLORS[item.status] }]}>
                    <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
                </View>
            </View>

            <Text style={styles.timeText}>From {new Date(item.earliest_time).toLocaleString()}</Text>
            <Text style={styles.timeText}>To {new Date(item.latest_time).toLocaleString()}</Text>
            {activeTab === 'driver' && item.status === 'pending' && (
                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.acceptBtn} onPress={() => onAccept(item.id)}>
                    <Text style={styles.btnText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectBtn} onPress={() => onReject(item.id)}>
                        <Text style={styles.btnText}>Reject</Text>
                    </TouchableOpacity>
                </View>
            )}
            {activeTab === 'rider' && item.status === 'confirmed' && (
                <TouchableOpacity style={styles.cancelBtn} onPress={() => onCancel(item.id)}>
                <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
            )}
        </View>
);

    return (
    <View style={styles.container}>
        <View style={styles.tabsRow}>
            <TouchableOpacity
            style={[styles.tab, activeTab === 'rider' && styles.activeTab]}
            onPress={() => setActiveTab('rider')}
            >
                <Text style={styles.tabText}>As Rider</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'driver' && styles.activeTab]}
                onPress={() => setActiveTab('driver')}
            >
                <Text style={styles.tabText}>As Driver</Text>
            </TouchableOpacity>
        </View>
    {loading ? (
        <View><Text style={styles.loadingText}>Loading...</Text></View>
        ) : (
            <FlatList
                data={commutes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.emptyText}>No commutes yet</Text>}
            />
    )}
    </View>

    );
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
tabsRow: { flexDirection: 'row', marginBottom: 16 },
tab: {
flex: 1,
padding: 12,
borderRadius: 8,
backgroundColor: '#E5E7EB',
marginHorizontal: 4,
},
activeTab: { backgroundColor: '#2563EB' },
tabText: { textAlign: 'center', color: '#111827', fontWeight: '600' },


card: {
backgroundColor: '#FFFFFF',
padding: 16,
borderRadius: 12,
marginBottom: 12,
shadowColor: '#000',
shadowOpacity: 0.05,
shadowRadius: 4,
},
disabledCard: { opacity: 0.6 },
rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
routeText: { fontSize: 16, fontWeight: '700' },
timeText: { color: '#4B5563', fontSize: 13 },


badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },


actionsRow: { flexDirection: 'row', marginTop: 12 },
acceptBtn: {
flex: 1,
backgroundColor: '#22C55E',
padding: 10,
borderRadius: 8,
marginRight: 6,
},
rejectBtn: {
flex: 1,
backgroundColor: '#EF4444',
padding: 10,
borderRadius: 8,
marginLeft: 6,
},
cancelBtn: {
backgroundColor: '#EF4444',
padding: 10,
borderRadius: 8,
marginTop: 12,
},
btnText: { color: '#FFFFFF', textAlign: 'center', fontWeight: '600' },


loadingText: { textAlign: 'center', marginTop: 20 },
emptyText: { textAlign: 'center', marginTop: 40, color: '#6B7280' },
});
export default MyCommutesScreen;