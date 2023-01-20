// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

export const exRes = {
  facet_counts: [],
  found: 28961877,
  hits: [
    {
      document: {
        desc: "desc1",
        link: "https://ru.reactjs.org/docs/faq-functions.html",
        icon: "icon1",
        title: "Babybug",
      },
      highlight: {},
      highlights: [
        {
          field: "title",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc2",
        link: "https://habr.com/ru/company/timeweb/blog/588498/",
        icon: "icon2",
        title: "Babybug2",
      },
      highlight: {},
      highlights: [
        {
          field: "title2",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc3",
        link: "https://mobile.twitter.com/olya_baton/status/1540829839204163590",
        icon: "icon3",
        title: "Babybug3",
      },
      highlight: {},
      highlights: [
        {
          field: "title3",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc4",
        link: "link4",
        icon: "icon4",
        title: "Babybug4",
      },
      highlight: {},
      highlights: [
        {
          field: "title4",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc1",
        link: "https://ru.reactjs.org/docs/faq-functions.html",
        icon: "icon1",
        title: "Babybug",
      },
      highlight: {},
      highlights: [
        {
          field: "title",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc2",
        link: "https://habr.com/ru/company/timeweb/blog/588498/",
        icon: "icon2",
        title: "Babybug2",
      },
      highlight: {},
      highlights: [
        {
          field: "title2",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc3",
        link: "https://mobile.twitter.com/olya_baton/status/1540829839204163590",
        icon: "icon3",
        title: "Babybug3",
      },
      highlight: {},
      highlights: [
        {
          field: "title3",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc4",
        link: "link4",
        icon: "icon4",
        title: "Babybug4",
      },
      highlight: {},
      highlights: [
        {
          field: "title4",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    }, {
      document: {
        desc: "desc1",
        link: "https://ru.reactjs.org/docs/faq-functions.html",
        icon: "icon1",
        title: "Babybug",
      },
      highlight: {},
      highlights: [
        {
          field: "title",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc2",
        link: "https://habr.com/ru/company/timeweb/blog/588498/",
        icon: "icon2",
        title: "Babybug2",
      },
      highlight: {},
      highlights: [
        {
          field: "title2",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc3",
        link: "https://mobile.twitter.com/olya_baton/status/1540829839204163590",
        icon: "icon3",
        title: "Babybug3",
      },
      highlight: {},
      highlights: [
        {
          field: "title3",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc4",
        link: "link4",
        icon: "icon4",
        title: "Babybug4",
      },
      highlight: {},
      highlights: [
        {
          field: "title4",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    }, {
      document: {
        desc: "desc1",
        link: "https://ru.reactjs.org/docs/faq-functions.html",
        icon: "icon1",
        title: "Babybug",
      },
      highlight: {},
      highlights: [
        {
          field: "title",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc2",
        link: "https://habr.com/ru/company/timeweb/blog/588498/",
        icon: "icon2",
        title: "Babybug2",
      },
      highlight: {},
      highlights: [
        {
          field: "title2",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc3",
        link: "https://mobile.twitter.com/olya_baton/status/1540829839204163590",
        icon: "icon3",
        title: "Babybug3",
      },
      highlight: {},
      highlights: [
        {
          field: "title3",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc1",
        link: "https://ru.reactjs.org/docs/faq-functions.html",
        icon: "icon1",
        title: "Babybug",
      },
      highlight: {},
      highlights: [
        {
          field: "title",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc2",
        link: "https://habr.com/ru/company/timeweb/blog/588498/",
        icon: "icon2",
        title: "Babybug2",
      },
      highlight: {},
      highlights: [
        {
          field: "title2",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc3",
        link: "https://mobile.twitter.com/olya_baton/status/1540829839204163590",
        icon: "icon3",
        title: "Babybug3",
      },
      highlight: {},
      highlights: [
        {
          field: "title3",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    }, {
      document: {
        desc: "desc1",
        link: "https://ru.reactjs.org/docs/faq-functions.html",
        icon: "icon1",
        title: "Babybug",
      },
      highlight: {},
      highlights: [
        {
          field: "title",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc2",
        link: "https://habr.com/ru/company/timeweb/blog/588498/",
        icon: "icon2",
        title: "Babybug2",
      },
      highlight: {},
      highlights: [
        {
          field: "title2",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc3",
        link: "https://mobile.twitter.com/olya_baton/status/1540829839204163590",
        icon: "icon3",
        title: "Babybug3",
      },
      highlight: {},
      highlights: [
        {
          field: "title3",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    }, {
      document: {
        desc: "desc1",
        link: "https://ru.reactjs.org/docs/faq-functions.html",
        icon: "icon1",
        title: "Babybug",
      },
      highlight: {},
      highlights: [
        {
          field: "title",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc2",
        link: "https://habr.com/ru/company/timeweb/blog/588498/",
        icon: "icon2",
        title: "Babybug2",
      },
      highlight: {},
      highlights: [
        {
          field: "title2",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc3",
        link: "https://mobile.twitter.com/olya_baton/status/1540829839204163590",
        icon: "icon3",
        title: "Babybug3",
      },
      highlight: {},
      highlights: [
        {
          field: "title3",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    }, {
      document: {
        desc: "desc1",
        link: "https://ru.reactjs.org/docs/faq-functions.html",
        icon: "icon1",
        title: "Babybug",
      },
      highlight: {},
      highlights: [
        {
          field: "title",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc2",
        link: "https://habr.com/ru/company/timeweb/blog/588498/",
        icon: "icon2",
        title: "Babybug2",
      },
      highlight: {},
      highlights: [
        {
          field: "title2",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc3",
        link: "https://mobile.twitter.com/olya_baton/status/1540829839204163590",
        icon: "icon3",
        title: "Babybug3",
      },
      highlight: {},
      highlights: [
        {
          field: "title3",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc4",
        link: "link4",
        icon: "icon4",
        title: "Babybug4",
      },
      highlight: {},
      highlights: [
        {
          field: "title4",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc5",
        link: "link5",
        icon: "icon5",
        title: "Babybug5",
      },
      highlight: {},
      highlights: [
        {
          field: "title",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
    {
      document: {
        desc: "desc6",
        link: "link6",
        icon: "icon6",
        title: "Babybug6",
      },
      highlight: {},
      highlights: [
        {
          field: "title6",
          snippet:
            "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone",
        },
      ],
    },
  ],
  out_of: 28961877,
  page: 1,
  request_params: { collection_name: "books_1638578845", per_page: 10, q: "*" },
  search_cutoff: false,
  search_time_ms: 1123,
};
