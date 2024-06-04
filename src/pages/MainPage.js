import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function MainPage() {

    const [date, setDate] = useState(null);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
    const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);

    const [currencyNames, setCurrencyNames] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await axios.get(
                "http://localhost:5000/convert", { params: { date, sourceCurrency, targetCurrency, amountInSourceCurrency }, }
            );
            setAmountInTargetCurrency(responce.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };


    //get all currency rates
    useEffect(() => {
        const getCurrencyNames = async () => {
            try {
                const responce = await axios.get(
                    "http://localhost:5000/getAllCurrencies"
                );
                setCurrencyNames(responce.data);
            } catch (err) {
                console.error(err);
            }
        };
        getCurrencyNames();
    }, [])

    return (
        <div>
            <h1 className='lg-mx-32 text-5xl font-bold text-green-600'>Convert Your Currencies</h1>
            <p className='lg-mx-32 opacity-60 py-6'>Welcome to Currency Converter Website. Using our application, users can easily select their source and target currencies, enter the amount they wish to convert, and instantly receive the equivalent amount in the target currency. This application fetches the latest exchange rates from a reliable API, ensuring that users get accurate and up-to-date information. </p>
            <div className='mt-5 flex items-center justify-center flex-col '>
                <section className='w-full lg:w-1/2 '>
                    <form onSubmit={handleSubmit} >

                        <div className="mb-4">
                            <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>

                            <input onChange={(e) => setDate(e.target.value)} type="date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sourceCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
                            <select value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)} id="sourceCurrency" name="sourceCurrency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required>
                                <option value="">Select Source Currency</option>
                                {Object.keys(currencyNames).map((currency) => (<option className="p-1" key={currency} value={currency}>{currencyNames[currency]}</option>))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="targetCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
                            <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)} id="targetCurrency" name="targetCurrency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required>
                                <option value="">Select Target Currency</option>
                                {Object.keys(currencyNames).map((currency) => (<option className="p-1" key={currency} value={currency}>{currencyNames[currency]}</option>))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in Source Currency</label>
                            <input onChange={(e) => setAmountInSourceCurrency(e.target.value)} type="number" id={amountInSourceCurrency} name={amountInSourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder='Amount in Source Currency' required />
                        </div>

                        <button className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md'  >Get the target Currency</button>

                    </form>
                </section>

            </div>
            {!loading ? (<section className='ml-20 mt-3 lg-mx-60'>{amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to {" "} <span className='text-green-500 font-bold'>{amountInTargetCurrency}</span> {currencyNames[targetCurrency]}</section>
            ) : (null)}
        </div>
    )
}
