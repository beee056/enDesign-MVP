import { redirect } from "next/navigation";

const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeGCpXgMTn58hODYTrwYX2OWh1nQd1ZCmLVMcenhqEYuvPJqw/viewform?usp=publish-editor";

export default function SupportPage() {
  redirect(googleFormUrl);
}
