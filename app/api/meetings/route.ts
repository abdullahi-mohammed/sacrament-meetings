import { getMeetingByDate, getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const date = params.get('date');
  if (date) {
    const meeting = await getMeetingByDate(date);
    return Response.json(meeting ? [meeting] : []);
  }

  const query = params.get('query') ?? '';
  const currentPage = Number(params.get('page')) || 1;
  const meetings = await getMeetings(query, currentPage);
  return Response.json(meetings);
}
