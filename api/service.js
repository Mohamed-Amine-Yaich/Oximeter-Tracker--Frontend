import Client from "./Client";

export async function getAllService(token) {
  try {
    const res = await Client.get("/users", {
      headers: {
        authorization: token,
      },
    });
    console.log("response data(patient for doctor and doctors for client) :");
    console.log(res.data.data);
    const allData = res.data.data;
    return allData;
  } catch (error) {
    console.log("error in getAll service methode:" + error);
  }
}

export async function loginService(data) {
  try {
    const res = await Client.post("/users/login", { ...data });
    console.log("from service !!!!!!!!!!!!!!");
    console.log(res.data.status);
    console.log(res.data.data);
    console.log(res.data.data.user.name);
    console.log(res.headers["set-cookie"][0]);
    console.log("end service !!!!!!!!!!!!");
    return res;
  } catch (error) {
    return "Failed";
  }
}

export async function signUpService(data) {
  try {
    const res = await Client.post("/users/signup", {
      ...data,
    });

    console.log("response service:" + res);
    console.log("response.data service  :" + res.data);

    return res;
  } catch (error) {
    console.log("error in  sign up service methode :" + error);
  }
}

export async function updateMe(data, token) {
  try {
    const res = await Client.patch(
      "/users/updateMe",
      { ...data },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log(res.data.data.name);
    return res.data.data;
  } catch (error) {
    console.log("error in updateMe service methode:" + error);
  }
}

export async function getMe(token) {
  try {
    const res = await Client.get("/users/getMe", {
      headers: {
        authorization: token,
      },
    });
    const allData = res.data.data;
    console.log(allData);
    return allData;
  } catch (error) {
    console.log("error in getme service methode:" + error);
  }
}

export async function getMessages(token, receiver) {
  try {
    const res = await Client.get(`/users/receiver/${receiver}/`, {
      headers: {
        authorization: token,
      },
    });

    console.log("response from get messages in service :");
    console.log(res.data.data.document); /* array of all messagesmessages */
    const tabOfmsg = res.data.data.document;
    return tabOfmsg;
  } catch (error) {
    console.log("error in getme service methode:" + error);
  }
}

export async function postMessage(token, receiver, content) {
  try {
    console.log(content);
    const res = await Client.post(
      `/users/receiver/${receiver}`,
      { ...content },
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log("response from post messages in service :");
    console.log(res.data.data); /* array of all messagesmessages */
    return res.data.data;
  } catch (error) {
    console.log("error in getme service methode:" + error);
  }
}
