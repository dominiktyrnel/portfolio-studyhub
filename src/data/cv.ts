export interface Profile {
    name: string;
    nameKr: string;
    title: string;
    location: string;
    email: string;
    phoneCz: string;
    kakaoId: string;
    visa: string;
    photo: string;
}

export const profile: Profile = {
    name: "Dominik Tyrnel",
    nameKr: "도미닉 티르넬",
    title: "Hands-on Construction Specialist",
    location: "체코(Brno)",
    email: "dominiktyrnel@gmail.com",
    phoneCz: "+420 XXX XXX XXX",
    kakaoId: "dominikt",
    visa: "비자 협의 가능",
    photo: "/img/profile.webp" // Ensure this path is correct or uses placeholder logic in component
};

// Simplified export since detailed content is moved to content/kr.ts
export const motivation = [];
export const coreStats = [];
export const experience = [];
export const skills = {}; // We will use content/kr.ts for the structured skills display
