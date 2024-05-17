import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {


    const [isLoading, setIsloading] = useState(false);

    const [image, setImage] = useState(null);
    const [erreur, setErreur] = useState(''); // erreur est un tableau qui contient les erreurs [
    
    
    const handleRegister = async (event) => {
        setErreur('');
        setIsloading(true);
        event.preventDefault();
        // il faut faire la fetch
        const urlRegister = import.meta.env.VITE_API_URL+'/register';

        const formData = new FormData();
        const image = event.target.elements.image.files[0];
        console.log(event.target.elements.email.value)
        formData.append('image', image);
        formData.append('prenom', event.target.elements.prenom.value);
        formData.append('nom', event.target.elements.nom.value);
        formData.append('telephone', event.target.elements.telephone.value);
        formData.append('email', event.target.elements.email.value);
        formData.append('password', event.target.elements.password.value);
        formData.append('adresse', event.target.elements.adresse.value);
        formData.append('date_naissance', event.target.elements.date_naissance.value);
        formData.append('lieu_naissance', event.target.elements.lieu_naissance.value);

        // console.log(formData);
        // return;
        try {
            const response = await fetch(urlRegister, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
    
            const data = await response.json();
    
            if (data.status === 'error') {
                setErreur(data.message);
                return;
            }
    
            localStorage.setItem('id', data.user.id);
            localStorage.setItem('nom', data.user.nom);
            localStorage.setItem('prenom', data.user.prenom);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('telephone', data.user.telephone);
            localStorage.setItem('date_naissance', data.user.date_naissance);
            localStorage.setItem('adresse', data.user.adresse);
            localStorage.setItem('lieu_naissance', data.user.lieu_naissance);
            localStorage.setItem('token', data.authorization.token);
            localStorage.setItem('image', data.user?.image ?? '');
    
            navigate("/app/", { replace: true });
        } catch (error) {
            console.error('Error:', error);
            setErreur(error.message || "Une erreur s'est produite");
        }
        
        console.log(image);
        console.log(formData);


        // console.log(event.target.elements)
        // console.log(urlLogin
        return;
    }


    return (
        <div>
            {/* <!-- component --> */}
<section className="bg-white ">
    <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5" style={{backgroundImage: `url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')`}}>
        </div>

        <div className="h-screen  flex items-center w-full max-w-4xl mx-auto lg:px-12 lg:w-3/5">
            <div className="h-full overflow-scroll w-full p-8">
                <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
                    Obtenez un compte gratuitement
                </h1>

                <p className="mt-4 text-gray-500 ">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam voluptatum similique ex nemo mollitia ipsa excepturi, neque expedita possimus eaque molestias rerum quo unde repellat assumenda laboriosam quas pariatur necessitatibus.
                </p>


                <form onSubmit={handleRegister}>
                    
                    <div className='mt-10 flex justify-center'>
                        <div className='w-48 h-48 relative rounded-full bg-gray-300'>
                            <input
                                onChange = {(event) => {
                                    const file = event.target.files[0];
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        if(reader.readyState === 2){
                                            setImage(reader.result);
                                        }
                                    }
                                    reader.readAsDataURL(file);
                                }}
                            type="file" name="image" id="image" className='absolute h-full w-full opacity-0' />
                            {image &&
                                <img src={image} alt="profile" className='w-full h-full object-cover rounded-full' />

                            }
                        </div>

                    </div>


                    <div className='grid grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
                        <div className='mt-4'>
                            <label className="block mb-2 text-sm text-gray-600 ">Prénom</label>
                            <input name='prenom' type="text" placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className='mt-4'>
                            <label className="block mb-2 text-sm text-gray-600 ">Nom</label>
                            <input name='nom' type="text" placeholder="Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className='mt-4'>
                            <label className="block mb-2 text-sm text-gray-600 ">Numéro téléphone</label>
                            <input name='telephone' type="text" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className='mt-4'>
                            <label className="block mb-2 text-sm text-gray-600 ">Adresse email</label>
                            <input name='email' type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className='mt-4'>
                            <label className="block mb-2 text-sm text-gray-600 ">Mot de passe</label>
                            <input name='password' type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className='mt-4'>
                            <label className="block mb-2 text-sm text-gray-600 ">Confrimer mot de passe</label>
                            <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className='mt-4'>
                            <label className="block mb-2 text-sm text-gray-600 ">Adresse</label>
                            <input name='adresse' type="text" placeholder="Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className='mt-4'>
                            <label className="block mb-2 text-sm text-gray-600 ">Date de naissance</label>
                            <input name='date_naissance' type="date" placeholder="Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className='mt-4'>
                            <label className="block mb-2 text-sm text-gray-600 ">Lieu de naissance</label>
                            <input name='lieu_naissance' type="text" placeholder="Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md   focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                    </div>




                    <div className='flex w-full mt-10'>
                        <button
                            className="text-center bg-secondaire hover:text-secondaire border-2 border-secondaire flex items-center justify-center w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-white focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            <span>Créer compte </span>

                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </form>
                
                <p className="mt-8">Vous n'avez pas de compte ? <Link to="/register" className="text-secondaire  font-semibold">Créer un compte</Link></p>
            </div>
        </div>
    </div>
</section>
        </div>
    );
}

export default Register;
