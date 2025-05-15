import querystring from "querystring";
import MemberModel from "../../models/member/MemberSchema.js";
import { MentorAttendModel } from "../../models/Mentor/Attendance.js";
function getQR(session_id, email) {
  let url = `${process.env.CLIENT_URL}/login?${querystring.stringify({
    session_id,
    email,
  })}`;
  return url;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the Earth in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters
  return distance;
}
function checkStudentDistance(Location1, Location2) {
  Location1 = Location1.split(",");
  Location2 = Location2.split(",");
  const locationLat1 = parseFloat(Location1[0]);
  const locationLon1 = parseFloat(Location1[1]);
  const locationLat2 = parseFloat(Location2[0]);
  const locationLon2 = parseFloat(Location2[1]);

  const distance = haversineDistance(
    locationLat1,
    locationLon1,
    locationLat2,
    locationLon2
  );
  return distance.toFixed(2);
}

//make controller functions


//attend session
async function AttendSession(req, res) {
  let tokenData = req.user;
  const { userId, IP, Location } =
    req.body;
    const {id} = req.params

  try {
    let present = false;
    let session_details = {};
    const MentorAttend = await MemberModel
    teacher.sessions.map(async (session) => {
      if (session.session_id === session_id) {
        let distance = checkStudentDistance(Location, session.location);
        session.attendance.map((mentor) => {
          if (
            mentor.regno === regno
          ) {
            present = true;
          }
        });
        if (!present) {
          res.status(200).json({ message: "Attendance marked successfully" });
           
          session.attendance.push({
              regno,
              date,
              IP,
              mentor_email: tokenData.email,
              Location,
              distance,
            });
          
          await MemberModel.findOneAndUpdate(
            { userId: teacher_email },
            { sessions: teacher.sessions }
          );
          await Student.findOneAndUpdate(
            { userId: mentor_email },
            { $push: { sessions: session_details } }
          );
        }
      }
    });
    if (present) {
      res.status(200).json({ message: "Attendance already marked" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//get student sessions
async function GetStudentSessions(req, res) {
  let tokenData = req.user;
  try {
    const student = await Student.findOne({
      email: tokenData.email,
    });
    res.status(200).json({ sessions: student.sessions });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const SessionController = {
  
  AttendSession,
  GetStudentSessions,
};

export default SessionController;
