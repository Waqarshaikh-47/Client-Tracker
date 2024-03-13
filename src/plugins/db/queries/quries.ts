// queries.ts

import firestore from "@/plugins/db/fireBaseInit";

const queries: any = {
  async fetchUserDataByEmail(email: string) {
    console.log(email);
    
    try {
      const querySnapshot = await firestore
        .collection("users")
        .where('email','==', email)
        .get();
      const userData: any = [];
      querySnapshot.forEach((userDoc) => {
        userData.push(userDoc.data());
      });
      return userData;
    } catch (error) {
      console.error("Error fetching user data by email:", error);
      throw error;
    }
  },

  // Define more query functions here
};

export default queries;
