import {useEffect, useState} from "react";
import { Calculator } from "lucide-react";

export default function App() {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageType, setMortgageType] = useState("repayment");
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);

  const calculateRepayments = () => {
    const principal = parseFloat(mortgageAmount);
    const years = parseFloat(mortgageTerm);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = years * 12;

    // Input validation
    if (isNaN(principal) || isNaN(years) || isNaN(rate)) {
      alert("Please ensure all input values are numeric.");
      return;
    }
    if (principal <= 0 || years <= 0 || rate <= 0) {
      alert("Please enter positive values for all inputs.");
      return;
    }

    if (mortgageType === "repayment") {
      const x = Math.pow(1 + rate, months);
      const monthly = (principal * x * rate) / (x - 1);
      setMonthlyPayment(monthly);
      setTotalRepayment(monthly * months);
      setTotalInterest(monthly * months - principal);
    } else {
      const monthly = principal * rate;
      setMonthlyPayment(monthly);
      setTotalInterest(monthly * months);
      setTotalRepayment(principal + monthly * months);
    }
  };

  const clearAll = () => {
    setMortgageAmount("");
    setMortgageTerm("");
    setInterestRate("");
    setMortgageType("repayment");
    setMonthlyPayment(0);
    setTotalInterest(0);
    setTotalRepayment(0);
  };
  useEffect(() => {
    console.log(totalInterest)
  }, [totalInterest]);
  const formatCurrency = (value:number) =>
      value
          ? new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
          }).format(value)
          : null;

  return (
      <div className="min-h-screen md:flex items-center justify-center md:bg-slate-100 pt-11 md:pt-0" >
        {/* Main Container */}
        <div className="flex flex-col md:flex-row bg-white shadow-lg   mx-auto container md:h-[600px] md:w-[1100px] gap-5 md:rounded-2xl">

          {/* Left Panel with Inputs */}
          <div className="w-full md:w-1/2 md:p-16 px-8 py-2">
            <div className="flex flex-col md:flex-row md:justify-between text-2xl ">

            <h2 className=" font-semibold text-slate-900 mb-4">Mortgage Calculator</h2>
            <button onClick={clearAll}  className="w-1/4  border-b-2 border-slate-500 mb-4 font-semibold text-lg text-slate-500 text-left md:text-center" color={"hsl(200, 24%, 40%)"}>
              Clear All
            </button>
            </div>

            {/* Mortgage Amount */}
            <div className="mb-6">
              <label className="block text-slate-600 mb-2">Mortgage Amount</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center  text-slate-500 px-3 rounded" style={{backgroundColor:"hsl(203, 41%, 72%,0.5)"}}>£</span>
                <input
                    type="number"
                    value={mortgageAmount}
                    onChange={(e) => setMortgageAmount(e.target.value.replace(/[^\d.]/g, ""))}
                    className="w-full pl-11 pr-4 py-3 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                />
              </div>
            </div>

            {/* Mortgage Term */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-slate-600 mb-2">Mortgage Term</label>
                <div className="relative">
                  <input
                      type="number"
                      value={mortgageTerm}
                      onChange={(e) => setMortgageTerm(e.target.value.replace(/[^\d]/g, ""))}
                      className="w-full px-5 py-3 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 bg-blue-50 px-3 rounded-r  text-slate-500"  style={{backgroundColor:"hsl(203, 41%, 72%,0.5)"}}>
                  years
                </span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-slate-600 mb-2">Interest Rate</label>
                <div className="relative">
                  <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value.replace(/[^\d.]/g, ""))}
                      className="w-full px-5 py-3 border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      step="0.01"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3  px-3 rounded-r  text-slate-500"  style={{backgroundColor:"hsl(203, 41%, 72%,0.5)"}}>
                  %
                </span>
                </div>
              </div>
            </div>

            {/* Mortgage Type Selection */}
            <div className="mb-6">
              <label className="block text-slate-600 mb-2">Mortgage Type</label>
              <div className="space-y-3">
                <label className="block border hover:border-slate-900 font-semibold text-xl rounded-md p-3 cursor-pointer">
                  <div className="flex items-center">
                    <input
                        type="radio"
                        value="repayment"
                        checked={mortgageType === "repayment"}
                        onChange={() => setMortgageType("repayment")}
                        className="mr-2"
                    />
                    <span>Repayment</span>
                  </div>
                </label>
                <label className="block border hover:border-slate-900 font-semibold text-xl rounded-md p-3 cursor-pointer">
                  <div className="flex items-center">
                    <input
                        type="radio"
                        value="interest-only"
                        checked={mortgageType === "interest-only"}
                        onChange={() => setMortgageType("interest-only")}
                        className="mr-2"
                    />
                    <span>Interest Only</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Calculate Button */}
            <button
                onClick={calculateRepayments}
                className="flex items-center justify-center md:w-[300px] w-full py-3 px-4  rounded-full text-slate-900 font-medium"
                style={{backgroundColor:"hsl(61, 70%, 52%)"}}
            >
              <Calculator size={20} className="mr-2" />
              Calculate Repayments
            </button>
          </div>

          {/* Right Panel with Results */}
          <div className="w-full md:w-1/2  text-white p-8 flex flex-col justify-center items-center md:rounded-bl-[100px] md:rounded-2xl" style={{backgroundColor:"hsl(202, 55%, 16%)"}}>
            {monthlyPayment ? (
                <div className="text-left ">
                  <h2 className="text-3xl font-bold mb-6">Your results</h2>
                  <p style={{opacity:"0.5"}}>Your results are shown below just as the information provided.To adjust the results,edit the form and click "calculate repayments" again</p>
                  <div className="space-y-4  my-5 shadow-lg border-t-2  p-8 rounded-xl " style={{borderTop:"solid 5px rgb(215, 218, 47)",background:"hsl(210, 75%, 16%)"}}>
                    <div>
                      <p className="text-slate-400">Monthly Payment</p>
                      <p className="text-4xl font-bold" style={{color:"rgb(215, 218, 47)"}}>{formatCurrency(monthlyPayment)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Total Amount Repayable</p>
                      <p className="text-4xl font-semibold">{formatCurrency(totalRepayment)}</p>
                    </div>
                  </div>
                </div>
            ) : (
                <div className="text-center  flex flex-col items-center">
                  <img src="illustration-empty.svg" alt="empty"></img>
                  <h2 className="text-3xl font-bold mb-4">Results shown here</h2>
                  <p className="text-slate-400 max-w-md">
                    Complete the form and click "Calculate Repayments" to see your monthly payments.
                  </p>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}