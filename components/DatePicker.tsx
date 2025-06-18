import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CustomDateInput } from "./CustomDateInput";

// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateSelector = ({ field }: { field: any }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={field.value}
      onChange={(date) => field.onChange(date)}
      customInput={<CustomDateInput placeholder="select date" />}
    />
  );
};

export default DateSelector;
