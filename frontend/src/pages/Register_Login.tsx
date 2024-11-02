import { Navbar } from '../components/Navbar/Navbar';
import { Signup } from '../components/Signup-Login/Signup-Login'

function Register_Login( {act}: { act: string } ) {
    return (
        <>
            <Navbar />
            <Signup action={act} />
        </>
    );
}

export default Register_Login;