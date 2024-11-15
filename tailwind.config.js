/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,jsx}"],
    theme: {
        extend: {
            maxWidth: {
                "1250p": "1250px"
            },
            boxShadow: {
                'custom-light': '0 2px 5px rgba(0, 0, 0, 0.1)',
                'custom-medium': '0 4px 10px rgba(0, 0, 0, 0.2)',
                'custom-dark': '0 6px 15px rgba(0, 0, 0, 0.3)',
                'custom-mine': 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
            },
        },
    },
    plugins: [],
}