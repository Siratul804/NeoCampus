import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import * as Yup from "yup";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateEventModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer" variant="outline">
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
            <EventForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateEventModal;

const eventSchema = Yup.object().shape({
  name: Yup.string().required("Event name is required"),
  description: Yup.string().required("Event description is required"),
  date: Yup.date().required("Event date is required"),
  time: Yup.string().required("Event time is required"),
  club: Yup.string().required("Event club is required"),
});

const EventForm = () => {
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        date: "",
        time: "",
        club: "",
      },
      validationSchema: eventSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <form className="space-y-2 mt-5 text-start" onSubmit={handleSubmit}>
      {/* event title */}
      <div>
        <label className="text-sm" htmlFor="name">
          Event Title
        </label>
        <Input
          className={"mt-1"}
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {touched.name && errors.name && (
          <p className="text-red-500 mt-1 text-xs">{errors.name}</p>
        )}
      </div>

      {/* event description */}
      <div>
        <label className="text-sm" htmlFor="description">
          Event Description
        </label>
        <Textarea
          className={"mt-1"}
          type="text"
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
        {touched.description && errors.description && (
          <p className="text-red-500 mt-1 text-xs">{errors.description}</p>
        )}
      </div>

      {/* event date */}
      <div>
        <label className="text-sm" htmlFor="date">
          Event Date
        </label>
        <Input
          className={"mt-1 w-full"}
          type="date"
          id="date"
          name="date"
          value={values.date}
          onChange={handleChange}
        />
        {touched.date && errors.date && (
          <p className="text-red-500 mt-1 text-xs">{errors.date}</p>
        )}
      </div>

      {/* event time */}
      <div>
        <label className="text-sm" htmlFor="time">
          Event Time
        </label>
        <Input
          className={"mt-1"}
          type="time"
          id="time"
          name="time"
          value={values.time}
          onChange={handleChange}
        />
        {touched.time && errors.time && (
          <p className="text-red-500 mt-1 text-xs">{errors.time}</p>
        )}
      </div>

      {/* select club */}
      <div>
        <label className="text-sm" htmlFor="club">
          Select Club
        </label>
        <Select
          name="club"
          value={values.club}
          onValueChange={(value) => {
            setFieldValue("club", value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Club" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Robotics">Robotics Club</SelectItem>
            <SelectItem value="sng">Software & Hardware Club</SelectItem>
            <SelectItem value="cultural">Cultural Club</SelectItem>
          </SelectContent>
        </Select>

        {touched.club && errors.club && (
          <p className="text-red-500 mt-1 text-xs">{errors.club}</p>
        )}
      </div>

      {/* submit */}
      <div>
        <Button className={"mt-2 w-full cursor-pointer"} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
