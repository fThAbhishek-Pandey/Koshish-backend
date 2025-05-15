import mongoose from "mongoose";
const schema = mongoose.Schema;

const AttendanceSchema = new schema(
      {
        date: { type: Date, required: true },
        name: { type: String, default:"Koshish Class" },
        duration: { type: Number, default: 60 },
        location: { type: String, default:"" },
        radius: { type: String, default: "2" },
        attendance: [
          {
            userId: { type: String, required: true },
            subject:{ type: String, required: true },
            class:{type: String, required:true, unique:true},
            IP: { type: String, required: true },
            time: { type: Date, default: Date.now() },
            Location : { type: String, required: true },
            distance: { type: String, required: true },
          },
        ],
      },
  { timestamps: true }
);

export const MentorAttendModel = mongoose.model("MentorAttend", AttendanceSchema);
