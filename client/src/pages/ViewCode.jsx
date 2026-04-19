import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewCode = () => {
  const { id } = useParams();
  const [codeData, setCodeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/code/${id}`);
        const data = await res.json();
        setCodeData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!codeData) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Code not found ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-xl mb-4">
          {codeData.title || "Shared Code"}
        </h1>

        <div className="bg-black p-4 rounded overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap">
            {codeData.code}
          </pre>
        </div>

        <p className="mt-4 text-gray-400">
          Language: {codeData.language}
        </p>

      </div>
    </div>
  );
};

export default ViewCode;