import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: 'Nearer, My God, to Thee', type: 'musical-number' },
      { name: 'Brother Taylor', topic: 'Daily Discipleship', type: 'speaker' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: [
      'Ward temple night: May 10 at 7:00 PM',
      'Youth activity night: Wednesday at 6:30 PM',
      'Primary activity: Saturday at 10:00 AM'
    ]
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Anderson',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Martinez',
    wardBusiness: [
      { description: 'Release of Brother Clark as Sunday School teacher' },
      { description: 'Sustaining of Sister Clark as Relief Society instructor' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Congregation', topic: 'Bearing of testimonies', type: 'speaker' }
    ],
    closingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
    closingPrayer: 'Sister Evans',
    announcements: [
      'Fast Sunday collection envelopes available from the deacons',
      'Relief Society ministering interviews this week'
    ]
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Adams',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [
      { name: 'Brother Green', topic: 'The Power of the Book of Mormon', type: 'speaker' },
      { name: 'Elder & Sister Vance', topic: 'Service and Temple Covenants', type: 'speaker' }
    ],
    closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
    closingPrayer: 'Brother Wilson',
    announcements: [
      'Elders Quorum service project: Saturday May 23 at 8:00 AM',
      'Ward choir practice at 1:30 PM today in the chapel'
    ]
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'President Harrison (Stake Presidency)',
    conducting: 'Bishop Smith',
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Sister Lee',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 184, title: 'Upon the Cross of Calvary' },
    speakers: [
      { name: 'Stake High Councilor Brother Nelson', topic: 'Strengthening Our Families', type: 'speaker' },
      { name: 'String Ensemble', topic: 'Be Still, My Soul', type: 'musical-number' },
      { name: 'President Harrison', topic: 'Drawing Closer to the Savior', type: 'speaker' }
    ],
    closingHymn: { number: 144, title: 'Secret Prayer' },
    closingPrayer: 'Brother Baker',
    announcements: [
      'Stake youth conference registration closes May 31',
      'Stake blood drive next Thursday at the Stake Center'
    ]
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Anderson',
    openingHymn: { number: 27, title: 'Praise to the Man' },
    openingPrayer: 'Brother Roberts',
    wardBusiness: [{ description: 'New ward missionary sustaining' }],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
    speakers: [
      { name: 'Sister Campbell', topic: 'Charity: The Pure Love of Christ', type: 'speaker' },
      { name: 'Brother Ramirez', topic: 'Finding Peace in Christ', type: 'speaker' }
    ],
    closingHymn: { number: 166, title: 'Abide with Me!' },
    closingPrayer: 'Sister Cooper',
    announcements: [
      'Ward summer picnic planning meeting next Sunday after church'
    ]
  },
  {
    id: 6,
    date: '2026-11-08',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 26, title: 'Joseph Smith’s First Prayer' },
    openingPrayer: 'Sister Harris',
    wardBusiness: [{ description: 'Calling of new assistant Sunday School teacher' }],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Sister Walker', topic: 'Gratitude and Heavenly Blessings', type: 'speaker' },
      { name: 'Ward Choir', topic: 'How Great Thou Art', type: 'musical-number' },
      { name: 'Brother Hughes', topic: 'Standing as Witnesses of God', type: 'speaker' }
    ],
    closingHymn: { number: 227, title: 'There Is Sunshine in My Soul Today' },
    closingPrayer: 'Brother Miller',
    announcements: [
      'Ward conference next month',
      'Self-reliance courses starting next Tuesday evening'
    ]
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter(m => m.date === date);
  }
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}
