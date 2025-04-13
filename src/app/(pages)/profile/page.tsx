import { profileService } from "@/core/profile/profileService";
import ProfileRead from "./_components/ProfileRead";
import TestResultCard from "./_components/TestResultCard";
import SubjectSelecter from "./_components/SubjectSelecter";
import { cardService } from "@/core/Service/cardService";
import { userService } from "@/core/Service/userService";

export default async function ProfilePage() {
  const [userData, cardAllDatas, unAnsweredSubjects] = await Promise.all([
    userService.fetchUserData(),
    profileService.fetchCardAllDatas(),
    cardService.fetchUnAnsweredSubjects(),
  ]);

  return (
    <div className="max-w-md mx-auto rounded-lg mb-32">
      <ProfileRead userData={userData} />
      {cardAllDatas.map((cardAllData, index) => (
        <TestResultCard
          key={index}
          userData={userData}
          cardAllData={cardAllData}
        />
      ))}
      {unAnsweredSubjects.length > 0 && (
        <div className="text-center my-8">
          <SubjectSelecter unAnsweredSubjects={unAnsweredSubjects} />
        </div>
      )}
    </div>
  );
}
