import Link from "next/link";

const PAGE = [
    {
        url: '/',
        title: 'home page',
        blocks: [
            {
                "id": "slider_component_456",
                "type": "slider",
                "data": {
                    "slides": [
                        {
                            "image": "https://example.com/slide1.jpg",
                            "caption": "Slide 1",
                            "link": "/products/1"
                        },
                        {
                            "image": "https://example.com/slide2.jpg",
                            "caption": "Slide 2",
                            "link": "/products/2"
                        },
                        {
                            "image": "https://example.com/slide3.jpg",
                            "caption": "Slide 3",
                            "link": "/products/3"
                        }
                    ]
                },
                "settings": {
                    "autoplay": true,
                    "loop": true,
                    "showArrows": true,
                    "showIndicators": true,
                    "autoplaySpeed": 5000,
                    "transitionSpeed": 1000
                    // Other settings specific to the Slider component
                }
            },
            {
                "id": "hero_component_123",
                "type": "hero",
                "data": {
                    "image": "https://example.com/image.jpg",
                    "title": "Welcome to Our Website",
                    "description": "Discover amazing features and services.",
                    "buttonText": "Learn More",
                    "buttonLink": "/about",
                    "backgroundStyle": {
                        "backgroundColor": "#f5f5f5",
                        "textColor": "#333"
                    }
                },
                "settings": {
                    "fullWidth": true,
                    "height": "500px",
                    "showButton": true
                }
            }
        ]
    },

    {
        url: 'aboutus',
        title: 'About us',
        blocks: [
            {
                component: 'button',
                text: 'Get Start - about us',
                link: 'https://gmail.com'
            },

            {
                component: 'heading',
                text: 'this is a heading text from about us',
                className: 'text-blue-500 text-lg'
            }
        ]
    }

];

export default async function Page({params}: { params: { url: string } }) {
    const urls = PAGE.map(page => {
        return page.url;
    });

    return (
        <div>
            <div className="flex gap-5">
                {
                    urls?.map(pageUrl => {
                        const activePage = PAGE.find(page => params.url.includes(pageUrl));

                        return (
                            <Link key={activePage?.url} href={pageUrl}
                                  className={params?.url.includes(pageUrl) ? 'text-blue-500' : ''}>
                                {activePage?.title}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
