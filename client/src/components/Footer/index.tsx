import React, { useState } from "react";
import './style.css';

export function Footer() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="footer">
      <p className="text-outline">© 2023 Kozak, <b>Inc</b>orporated</p>
    </div>
  );
}

// export default Navigation;
