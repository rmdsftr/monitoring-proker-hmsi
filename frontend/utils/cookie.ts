import { userStore } from "@/store/user";


export async function fetchUser(){
    try {
        console.log('Fetching user with URL:', `${process.env.NEXT_PUBLIC_API_URL}/me`);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        console.log('Response status:', res.status);
        
        if(!res.ok) {
            const errorText = await res.text();
            console.error('Error response:', errorText);
            
            try {
                const errorData = JSON.parse(errorText);
                console.error('Parsed error:', errorData);
            } catch (parseError) {
                console.error('Could not parse error response');
            }
            
            throw new Error(`HTTP ${res.status}: ${errorText}`);
        }
        
        const data = await res.json();
        console.log("User data received:", data);
        
        userStore.getState().setUser(data);
        return data;
    } catch (error) {
        console.error('fetchUser error:', error);
        userStore.getState().setUser(null);
        return null;
    }
}

export async function refreshUser() {
    return await fetchUser();
}