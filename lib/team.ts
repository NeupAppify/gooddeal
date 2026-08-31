/*
::neup.documentation::gooddeal-team-directory
::function getTeamMemberBySlug(slug)
::title Good Deal Team Directory

::public

Stores the public team directory used by the team listing and team member pages.

Provides a lookup helper for resolving a team member from a route slug.

::param external slug
::datatype string
::required true

The team member slug from the route parameter.

::returns
::datatype TeamMember | undefined

The matching team member when the slug exists.

::public end

::private

The listing page and member detail page both import this module so member data
stays consistent across routes.

::private end

::end
*/

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
};

const TEAM_IMAGE_BASE_URL = "https://cdn.neupgroup.com/gooddeal";

export const teamMembers: TeamMember[] = [
  {
    slug: "mukti-nath-nepal",
    name: "Mukti Nath Nepal",
    role: "CEO",
    image: `${TEAM_IMAGE_BASE_URL}/muktinathnepal.jpeg`,
    phone: "940518336",
    email: "mukti.gooddeal@gmail.com",
  },
  {
    slug: "rasmi-nepal",
    name: "Rasmi Nepal",
    role: "Admin And Video Presenter",
    image: `${TEAM_IMAGE_BASE_URL}/rashminepal.jpeg`,
    phone: "9768569601",
    email: "rasmi.gooddeal@gmail.com",
  },
  {
    slug: "laxmi-timalsina",
    name: "Laxmi Timalsina",
    role: "Marketing Head",
    image: `${TEAM_IMAGE_BASE_URL}/laxmitimalsina.jpeg`,
    phone: "9768569605",
    email: "laxmi.gooddeal@gmail.com",
  },
  {
    slug: "roshan-nepal",
    name: "Roshan Nepal",
    role: "Agent",
    image: `${TEAM_IMAGE_BASE_URL}/roshannepal.jpeg`,
    phone: "9768569602",
    email: "roshan.gooddeal@gmail.com",
  },
  {
    slug: "vivek-kumar-shah",
    name: "Vivek Kumar Shah",
    role: "Video Editor and Videographer",
    image: `${TEAM_IMAGE_BASE_URL}/vivekshah.jpeg`,
    phone: "9768569604",
    email: "bibek.gooddeal@gmail.com",
  },
];

export function getTeamMemberBySlug(slug: string) {
  return teamMembers.find((member) => member.slug === slug);
}
