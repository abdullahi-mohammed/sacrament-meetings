import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);

  if (Number.isNaN(numId) || !Number.isInteger(numId) || numId <= 0) {
    return Response.json(
      { error: 'Invalid meeting ID. Must be a positive integer.' },
      { status: 400 }
    );
  }

  const meeting = await getMeetingById(numId);
  if (!meeting) {
    return Response.json(
      { error: `Meeting with ID ${numId} not found.` },
      { status: 404 }
    );
  }

  return Response.json(meeting, { status: 200 });
}
