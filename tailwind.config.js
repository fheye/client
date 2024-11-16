/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,jsx}"],
    theme: {
        extend: {
            backgroundImage: {
                'custom-gradient': 'linear-gradient(180deg, rgba(0, 10, 122, 0.2) 0%, rgba(0, 71, 179, 0.2) 100%)',
                'dashboardGradient': 'linear-gradient(180deg, rgb(245 239 239 / 79%) 0%, rgb(0 0 0) 100%)',
              },
            maxWidth: {
                "1250p": "1250px"
            },
            boxShadow: {
                'custom-light': '0 2px 5px rgba(0, 0, 0, 0.1)',
                'custom-medium': '0 4px 10px rgba(0, 0, 0, 0.2)',
                'custom-dark': '0 6px 15px rgba(0, 0, 0, 0.3)',
                'custom-mine': 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                'video': '0px 4px 13.1px 5px #000839',
                'dashboard-shadow': '0px 4px 6.5px 0px #00000040',
            },
            colors: {
                customLight: '#D9D9D9',
                customDark: '#1F316F',
                bgDark: '#0B0000',
                customWhite: '#ffffff'
            },
            gridTemplateColumns: {
                random: 'repeat(32, minmax(0, 1fr))',
            },
            gridTemplateRows: {
                random: 'repeat(32, minmax(0, 1fr))',
            },
        },
    },
    plugins: [],
}