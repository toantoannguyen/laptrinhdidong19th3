import React, { createContext, useState, useEffect } from "react";

// Tạo Context
export const AuthContext = createContext();

// Tạo Provider để bao bọc ứng dụng
export const AuthProvider = ({ children }) => {
  // Trạng thái người dùng (null nếu chưa đăng nhập)
  const [user, setUser] = useState(null);

  // Hàm đăng nhập (giả lập, bạn có thể thay bằng API thực tế)
  const signIn = (email, password) => {
    // Giả lập kiểm tra đăng nhập
    if (email === "test@gmail.com" && password === "123456") {
      const userData = { name: "Toan nguyen ", email: email };
      setUser(userData); // Lưu thông tin người dùng
      return true;
    }
    return false;
  };

  // Hàm đăng xuất
  const signOut = () => {
    setUser(null); // Xóa thông tin người dùng
  };

  // Trả về Provider với các giá trị cần thiết
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
