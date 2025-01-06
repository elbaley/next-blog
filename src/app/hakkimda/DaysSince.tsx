"use client";

export const DaysSince = () => {
  const today = new Date().getTime();
  const bday = new Date("1998-06-22").getTime();
  const days = Math.floor((today - bday) / 8.64e7);

  return <p>{days} gündür dünyadayım.</p>;
};
