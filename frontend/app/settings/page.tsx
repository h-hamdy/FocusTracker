"use client"
 
import * as React from "react"

import ProfileUpload from "@/components/ProfileUpload"
import SetDeadline from "@/components/SetDeadline"

export default function ProfilePictureUpload() {

  return (
    <div className="flex flex-col justify-center pt-10 gap-5">
      {/* <ProfileUpload/> */}
      <SetDeadline/>
    </div>
  );
}
