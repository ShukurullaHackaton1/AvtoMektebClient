import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiCheck,
  FiX,
  FiStar,
  FiCrop,
  FiCreditCard,
  FiPlay,
  FiArrowLeft,
  FiZap,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";

const Plans = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [userPlan, setUserPlan] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    fetchUserPlan();
  }, []);

  const fetchUserPlan = async () => {
    try {
      const response = await api.get("/templates/user-plan");
      setUserPlan(response.data.data);
    } catch (error) {
      console.error("User plan fetch error:", error);
    }
  };

  const createPayment = async () => {
    try {
      setLoadingPayment(true);
      const response = await api.post("/payments/create-payment");
      setPaymentData(response.data.data);
      setShowPaymentModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoadingPayment(false);
    }
  };

  const isPro = user?.plan === "pro";
  const isExpired =
    user?.planExpiryDate && new Date(user.planExpiryDate) < new Date();

  const freeFeatures = [
    { text: "20 ta test limiti", included: true },
    { text: "Barcha tillar", included: true },
    { text: "Xatolar tahlili", included: true },
    { text: "Statistika", included: true },
    { text: "Cheksiz testlar", included: false },
    { text: "Imtihon rejimi", included: false },
    { text: "Premium qo'llab-quvvatlash", included: false },
  ];

  const proFeatures = [
    { text: "Cheksiz testlar", included: true },
    { text: "Barcha tillar", included: true },
    { text: "Imtihon rejimi", included: true },
    { text: "Batafsil tahlil", included: true },
    { text: "Premium qo'llab-quvvatlash", included: true },
    { text: "Xatolar tahlili", included: true },
    { text: "Statistika", included: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <FiArrowLeft size={20} />
            <span>Bosh sahifaga qaytish</span>
          </button>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Test Planlarini Tanlang
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            O'zingizga mos plan tanlang va test yechishni boshlang
          </p>
        </div>

        {/* Current Plan Status */}
        {user && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isPro && !isExpired ? "bg-yellow-100" : "bg-gray-100"
                  }`}
                >
                  {isPro && !isExpired ? (
                    <FiCrop className="text-yellow-600" size={24} />
                  ) : (
                    <FiStar className="text-gray-600" size={24} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Joriy plan: {isPro && !isExpired ? "PRO" : "FREE"}
                  </h3>
                  <p className="text-gray-600">
                    {userPlan && user.plan === "free"
                      ? `Ishlatilgan: ${userPlan.lifetimeUsed}/20`
                      : isPro && !isExpired
                      ? "Cheksiz testlar"
                      : "20 ta test limiti"}
                  </p>
                </div>
              </div>
              {isPro && !isExpired && user?.planExpiryDate && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Tugash sanasi:</p>
                  <p className="font-medium text-gray-800">
                    {new Date(user.planExpiryDate).toLocaleDateString("uz-UZ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Plans Comparison */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* FREE Plan */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="text-gray-600" size={36} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                FREE Plan
              </h2>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                0 <span className="text-xl text-gray-500">so'm</span>
              </div>
              <p className="text-gray-600">
                Boshlang'ich foydalanuvchilar uchun
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {feature.included ? (
                    <FiCheck
                      className="text-green-500 flex-shrink-0"
                      size={20}
                    />
                  ) : (
                    <FiX className="text-red-400 flex-shrink-0" size={20} />
                  )}
                  <span
                    className={`${
                      feature.included ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/templates")}
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
            >
              <FiPlay size={18} />
              <span>Testni Boshlash</span>
            </button>
          </div>

          {/* PRO Plan */}
          <div className="bg-white rounded-2xl p-8 border-2 border-yellow-500 shadow-lg relative">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                Mashhur
              </span>
            </div>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCrop className="text-yellow-600" size={36} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                PRO Plan
              </h2>
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                35,000 <span className="text-xl text-gray-500">so'm/oy</span>
              </div>
              <p className="text-gray-600">
                Professional foydalanuvchilar uchun
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {isPro && !isExpired ? (
              <div className="w-full bg-green-100 text-green-700 py-3 px-6 rounded-lg font-medium text-center">
                Faol Plan
              </div>
            ) : (
              <button
                onClick={createPayment}
                disabled={loadingPayment}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <FiCreditCard size={18} />
                <span>
                  {loadingPayment ? "Yuklanmoqda..." : "PRO ga O'tish"}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Features Comparison Table */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Planlar Taqqoslash
          </h3>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">
                      Xususiyatlar
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">
                      FREE
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-yellow-600">
                      PRO
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 text-gray-700">Test limiti</td>
                    <td className="py-4 px-6 text-center text-gray-600">
                      20 ta
                    </td>
                    <td className="py-4 px-6 text-center text-yellow-600 font-medium">
                      Cheksiz
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-6 text-gray-700">Barcha tillar</td>
                    <td className="py-4 px-6 text-center">
                      <FiCheck className="text-green-500 mx-auto" size={20} />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <FiCheck className="text-green-500 mx-auto" size={20} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700">Imtihon rejimi</td>
                    <td className="py-4 px-6 text-center">
                      <FiX className="text-red-400 mx-auto" size={20} />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <FiCheck className="text-green-500 mx-auto" size={20} />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-6 text-gray-700">Statistika</td>
                    <td className="py-4 px-6 text-center">
                      <FiCheck className="text-green-500 mx-auto" size={20} />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <FiCheck className="text-green-500 mx-auto" size={20} />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-700">Xatolar tahlili</td>
                    <td className="py-4 px-6 text-center">
                      <FiCheck className="text-green-500 mx-auto" size={20} />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <FiCheck className="text-green-500 mx-auto" size={20} />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-6 text-gray-700">
                      Premium qo'llab-quvvatlash
                    </td>
                    <td className="py-4 px-6 text-center">
                      <FiX className="text-red-400 mx-auto" size={20} />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <FiCheck className="text-green-500 mx-auto" size={20} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiZap className="text-blue-600" size={32} />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Tez Boshlash
            </h4>
            <p className="text-gray-600">
              Bir necha daqiqada ro'yxatdan o'ting va testlarni boshlang
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="text-green-600" size={32} />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Xavfsiz To'lov
            </h4>
            <p className="text-gray-600">
              Barcha to'lovlar xavfsiz va himoyalangan
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrendingUp className="text-purple-600" size={32} />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Taraqqiyot Kuzatuvi
            </h4>
            <p className="text-gray-600">
              O'z natijalaringizni kuzatib boring va tahlil qiling
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && paymentData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCrop className="text-yellow-600" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                PRO Planga o'tish
              </h2>
              <p className="text-gray-600">35,000 so'm/oy</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">
                  PRO Plan imkoniyatlari:
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <FiCheck className="text-green-500" size={14} />
                    <span>Cheksiz testlar</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheck className="text-green-500" size={14} />
                    <span>Imtihon rejimi</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheck className="text-green-500" size={14} />
                    <span>1 oy amal qilish muddati</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <a
                  href={paymentData.clickUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FiCreditCard size={18} />
                  <span>Click orqali to'lash</span>
                </a>

                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
