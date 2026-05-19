
const ContactPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center">Contact</h1>
            <p className="text-2xl text-center mb-2">Thank you for your interest in PizzaFast. We are here to help you.</p>
            <p className="text-1xl text-center">You can contact us by email or phone.</p>
            <p className="text-1xl text-center">Email: <a href="mailto:info@pizzafast.com" className="text-blue-800 hover:text-blue-700">info@pizzafast.com</a></p>
            <p className="text-1xl text-center">Phone: <a href="tel:+48789739703" className="text-blue-800 hover:text-blue-700">+48789739703</a></p>
            <p className="text-1xl text-center">Address: 123 Main St, Anytown, USA</p>
            <p className="text-1xl text-center">Hours: 9:00 AM - 5:00 PM</p>
            <p className="text-1xl text-center">We are open 7 days a week.</p>
            
        </div>
    )
}

export default ContactPage;