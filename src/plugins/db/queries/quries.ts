// queries.ts

import firestore from "@/plugins/db/fireBaseInit";
import { User } from "@/schemas/user/User";
const queries: any = {
  async fetchUserDataByEmail(email: string) {
    console.log(email);

    try {
      const querySnapshot = await firestore
        .collection("users")
        .where("email", "==", email)
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

  async addUser(userData: User) {
    try {
      const userDataPlainObject = { ...userData }; // Convert User object to plain JavaScript object
      await firestore.collection("users").add(userDataPlainObject);
      console.log("User added successfully");
      alert("User added successfully");
    } catch (error) {
      alert("error" + error);
      console.error("Error adding user:", error);
      throw error;
    }
  },

  async getAllClientsInformation() {
    try {
      let data: any[] = [];
      const res = await firestore.collection("client-info").get();

      res.forEach((userDoc: any) => {
        let clientInfo = {
          id: userDoc.id,
          clientData: userDoc.data(),
        };
        data.push(clientInfo);
      });
      return data;
    } catch (error) {
      console.log();
      return [];
    }
  },
  async getAllUsersInformation() {
    try {
      let data: any[] = [];
      const res = await firestore.collection("users").get();
      res.forEach((userDoc: any) => {
        let clientInfo = {
          id: userDoc.id,
          clientData: userDoc.data(),
        };
        data.push(clientInfo);
      });
      return data;
    } catch (error) {
      console.log();
      return [];
    }
  },

  async addClientInformationData(data: object) {
    try {
      let res = await firestore.collection("client-info").add({ ...data });
      console.log("User added successfully", res);
      alert("User added successfully");
      return res.id;
    } catch (error) {
      alert("error" + error);
      console.error("Error adding user:", error);
      throw error;
    }
  },

  async deleteUser(userId: string) {
    try {
      await firestore.collection("users").doc(userId).delete();
      console.log("User deleted successfully");
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user: " + error);
      throw error;
    }
  },

  async updateUser(email: string, updatedFields: Partial<User>) {
    try {
      await firestore
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Convert updatedFields to a plain JavaScript object
            const updatedFieldsObject = { ...updatedFields };
            doc.ref.update(updatedFieldsObject);
          });
        });
      console.log("User information updated successfully");
      alert("User information updated successfully");
    } catch (error) {
      alert("Error updating user information: " + error);
      console.error("Error updating user information:", error);
      throw error;
    }
  },

  async updateClientInformationData(clientId: string, updatedFields: object) {
    try {
      await firestore
        .collection("client-info")
        .doc(clientId)
        .update(updatedFields);
      console.log("Client information updated successfully");
      alert("Client information updated successfully");
    } catch (error) {
      alert("Error updating client information: " + error);
      console.error("Error updating client information:", error);
      throw error;
    }
  },
};

export default queries;
