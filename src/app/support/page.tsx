import { redirect } from "next/navigation";

const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfc9Md8CsuevQjaHBCUVsikbc-yHVFXEgQH0lJt6QIeIyMzOw/viewform";

export default function SupportPage() {
  redirect(googleFormUrl);
}
