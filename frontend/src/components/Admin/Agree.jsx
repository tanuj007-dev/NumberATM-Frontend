import React, { useState } from "react";

export default function ConsentForm({agree, setAgree}) {

  return (
    <div
      className="w-full max-w-xl mx-auto p-4 border rounded-md"
    >
      {/* Checkbox with terms text */}
      <label className="flex items-start space-x-2 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1 h-5 w-5 text-black border-gray-400 rounded"
        />
        <span className="text-sm text-gray-100">
          By clicking submit, I agree to the{" "}
          <a
            href="/Terms-and-Condition"
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms & conditions
          </a>{" "}
          and{" "}
          <a
            href="/Privacy-Policy"
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>{" "}
          and give my consent to receive updates through SMS/Email.
        </span>
      </label>

    </div>
  );
}
