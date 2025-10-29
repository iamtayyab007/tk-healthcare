import * as React from "react";

interface EmailTemplateProps {
  firstName?: string;
  content: string;
  subject: string;
}

export function EmailTemplate({
  firstName,
  content,
  subject,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <h2>{subject}</h2>
      <p>{content}</p>
    </div>
  );
}
