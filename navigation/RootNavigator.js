import { NavigationContainer } from "@react-navigation/native";
import AppTabs from "./AppTabs";

function RootNavigator() {
    return (
        <NavigationContainer>
            <AppTabs />
        </NavigationContainer>
    );
}

export default RootNavigator;
    