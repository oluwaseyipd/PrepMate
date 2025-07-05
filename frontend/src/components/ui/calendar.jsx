import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

const Calendar = ({ className, ...props }) {
  return (
    <DayPicker
      className={`rounded-lg border bg-white shadow-sm p-4 ${className}`}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-5 w-5 text-gray-700" {...props} />, 
        IconRight: ({ ...props }) => <ChevronRight className="h-5 w-5 text-gray-700" {...props} />,
      }}
      styles={{
        caption: { textAlign: "center", marginBottom: "1rem", fontWeight: "bold", fontSize: "1.25rem" },
        day: { height: "2.5rem", width: "2.5rem", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", cursor: "pointer" },
        day_selected: { backgroundColor: "#3b82f6", color: "white" },
        day_today: { border: "2px solid #ffffff", height: "30px", width: "30px", background: "#3b82f6" },
        nav_button: { margin: "0 0.5rem", padding: "0.5rem", borderRadius: "50%", cursor: "pointer", backgroundColor: "#f3f4f6" },
        nav_button_next: { marginLeft: "auto" },
      }}
      {...props}
    />
);
};

export { Calendar }