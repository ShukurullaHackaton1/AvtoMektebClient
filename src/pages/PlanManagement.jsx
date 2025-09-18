import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiDollarSign,
  FiCalendar,
  FiPercent,
  FiSave,
  FiAlertCircle,
  FiArrowLeft,
  FiClock,
  FiTrendingUp,
  FiEdit3,
} from "react-icons/fi";
import axios from "../utils/api";
import toast from "react-hot-toast";

const PlanManagement = () => {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [formData, setFormData] = useState({
    price: "",
    originalPrice: "",
    duration: "",
    discountEndDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchPlanData();
    fetchHistory();
  }, []);

  const fetchPlanData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("/admin/plan/pricing", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const plan = response.data.data;
      setPlanData(plan);

      // Form ga yuklab olish
      setFormData({
        price: plan.price || "",
        originalPrice: plan.originalPrice || "",
        duration: plan.duration || 30,
        discountEndDate: plan.discountEndDate
          ? new Date(plan.discountEndDate).toISOString().split("T")[0]
          : "",
      });
    } catch (error) {
      console.error("Plan fetch error:", error);
      toast.error("Plan ma'lumotlarini yuklashda xatolik");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("/admin/plan/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(response.data.data);
    } catch (error) {
      console.error("History fetch error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateDiscount = () => {
    const price = parseFloat(formData.price);
    const originalPrice = parseFloat(formData.originalPrice);

    if (originalPrice && originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.price || formData.price <= 0) {
      toast.error("Narx 0 dan katta bo'lishi kerak");
      return;
    }

    if (!formData.duration || formData.duration < 1) {
      toast.error("Muddat kamida 1 kun bo'lishi kerak");
      return;
    }

    try {
      setIsSaving(true);
      const token = localStorage.getItem("adminToken");

      const response = await axios.put(
        "/admin/plan/pricing",
        {
          price: parseInt(formData.price),
          originalPrice: formData.originalPrice
            ? parseInt(formData.originalPrice)
            : null,
          duration: parseInt(formData.duration),
          discountEndDate: formData.discountEndDate || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Plan narxlari muvaffaqiyatli yangilandi!");
      fetchPlanData();
      fetchHistory();
    } catch (error) {
      console.error("Update error:", error);
      if (error.response?.status === 403) {
        toast.error("Faqat super admin bu amalni bajara oladi");
      } else {
        toast.error(error.response?.data?.message || "Yangilashda xatolik");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Plan ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  const discountPercentage = calculateDiscount();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiArrowLeft size={20} />
              <span>Admin Dashboard</span>
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-xl font-bold text-gray-800">
              PRO Plan Narxlarini Boshqarish
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  PRO Plan Sozlamalari
                </h2>
                <p className="text-gray-600 mt-2">
                  Bu yerda PRO plan narxlarini va muddatini o'zgartiring
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Narx */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiDollarSign className="inline mr-2" size={16} />
                    Joriy narx (so'm)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Masalan: 19999"
                    min="0"
                    required
                  />
                  {formData.price && (
                    <p className="mt-2 text-sm text-gray-600">
                      Ko'rinishi: {formatCurrency(formData.price)}
                    </p>
                  )}
                </div>

                {/* Eski narx (chegirma uchun) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiPercent className="inline mr-2" size={16} />
                    Eski narx (chegirma ko'rsatish uchun, optional)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Masalan: 40000"
                    min="0"
                  />
                  {discountPercentage > 0 && (
                    <p className="mt-2 text-sm text-green-600">
                      Chegirma: {discountPercentage}% (
                      {formatCurrency(formData.originalPrice - formData.price)}{" "}
                      tejash)
                    </p>
                  )}
                </div>

                {/* Muddat */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiCalendar className="inline mr-2" size={16} />
                    Plan muddati (kunlarda)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Masalan: 30"
                    min="1"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    {formData.duration} kun ={" "}
                    {Math.floor(formData.duration / 30)} oy{" "}
                    {formData.duration % 30} kun
                  </p>
                </div>

                {/* Chegirma tugash sanasi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiClock className="inline mr-2" size={16} />
                    Chegirma tugash sanasi (optional)
                  </label>
                  <input
                    type="date"
                    name="discountEndDate"
                    value={formData.discountEndDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FiAlertCircle size={16} />
                    <span>
                      O'zgarishlar barcha foydalanuvchilar uchun amal qiladi
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center space-x-2"
                  >
                    <FiSave size={18} />
                    <span>{isSaving ? "Saqlanmoqda..." : "Saqlash"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Current Status & History */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Status */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Joriy holat
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Narx:</span>
                    <span className="font-bold text-gray-800">
                      {formatCurrency(planData?.price || 0)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Muddat:</span>
                    <span className="font-bold text-gray-800">
                      {planData?.duration || 30} kun
                    </span>
                  </div>
                </div>

                {planData?.originalPrice && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Chegirma:</span>
                      <span className="font-bold text-green-600">
                        {discountPercentage}%
                      </span>
                    </div>
                  </div>
                )}

                {planData?.updatedAt && (
                  <div className="text-xs text-gray-500 text-center">
                    Oxirgi yangilanish: {formatDate(planData.updatedAt)}
                  </div>
                )}
              </div>
            </div>

            {/* Change History */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiTrendingUp className="mr-2" size={20} />
                O'zgarishlar tarixi
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.length > 0 ? (
                  history.slice(0, 10).map((item, index) => (
                    <div
                      key={item._id}
                      className="p-3 bg-gray-50 rounded-lg text-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-800">
                          {formatCurrency(item.price)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.duration} kun
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(item.updatedAt)}
                      </div>
                      {item.updatedBy && (
                        <div className="text-xs text-gray-500 mt-1">
                          <FiEdit3 className="inline mr-1" size={10} />
                          {item.updatedBy.username}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Hali o'zgarishlar yo'q
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanManagement;
