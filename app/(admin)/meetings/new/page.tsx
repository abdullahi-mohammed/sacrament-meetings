import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <MeetingForm mode="create" />
    </div>
  );
}
