import orgApi from "./";
import authHeader from "utils/headers";

async function post(data) {
  let response;
  try {
    const event = { ...data };
    delete event['user'];
    response = await orgApi.post("/event", data, {
      headers: authHeader(data.user),
    });
    return response;
  } catch (err) {
    console.log("Event POST error: ", err.response || err);
    return err;
  }
}

export default eventServices = {
  post
};
