/** @jsx h */
import { h } from "https://esm.sh/preact@10.25.4";
import { useState } from "https://esm.sh/preact@10.25.4/hooks";

interface FormInputs {
  // Part 1: Personal Information
  fullName: string;
  email: string;
  age: number;
  location: string;

  // Part 2: Professional Background
  employmentStatus: "employed" | "partTime" | "selfEmployed" | "unemployed";
  yearsEmployed?: number;
  skills: string[];
  experienceLevel: "entry" | "intermediate" | "senior" | "expert";

  // Part 3: Career Goals
  careerGoals: string;
  salaryRange: number;
  preferredWorkStyle: "remote" | "hybrid" | "office";
  willingToRelocate: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  age?: string;
  location?: string;
  employmentStatus?: string;
  yearsEmployed?: string;
  experienceLevel?: string;
  careerGoals?: string;
  preferredWorkStyle?: string;
}

export default function SurveyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<Partial<FormInputs>>({
    skills: [],
    salaryRange: 30,
    willingToRelocate: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.fullName) {
        newErrors.fullName = "Name is required";
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Invalid email address";
      }
      if (!formData.age) {
        newErrors.age = "Age is required";
      } else if (formData.age < 18) {
        newErrors.age = "Must be at least 18 years old";
      } else if (formData.age > 100) {
        newErrors.age = "Must be less than 100 years old";
      }
      if (!formData.location) {
        newErrors.location = "Location is required";
      }
    } else if (step === 2) {
      if (!formData.employmentStatus) {
        newErrors.employmentStatus = "Please select your employment status";
      }
      if (formData.employmentStatus === "employed" && !formData.yearsEmployed) {
        newErrors.yearsEmployed = "Please enter years in current position";
      }
      if (!formData.experienceLevel) {
        newErrors.experienceLevel = "Please select your experience level";
      }
    } else if (step === 3) {
      if (!formData.careerGoals || formData.careerGoals.length < 50) {
        newErrors.careerGoals = "Please provide at least 50 characters";
      }
      if (!formData.preferredWorkStyle) {
        newErrors.preferredWorkStyle =
          "Please select your preferred work style";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 3) {
        setShowResults(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e: Event) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const name = target.name;

    if (target.type === "checkbox" && name === "skills") {
      const skills = [...(formData.skills || [])];
      const value = (target as HTMLInputElement).value;

      if ((target as HTMLInputElement).checked) {
        if (!skills.includes(value)) {
          skills.push(value);
        }
      } else {
        const index = skills.indexOf(value);
        if (index > -1) {
          skills.splice(index, 1);
        }
      }
      setFormData((prev) => ({ ...prev, skills }));
    } else if (target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: target.value }));
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`step ${currentStep === step ? "active" : ""} ${
            currentStep > step ? "completed" : ""
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div>
      <h2>Personal Information</h2>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName || ""}
          onChange={handleInputChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age || ""}
          onChange={handleInputChange}
        />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location || ""}
          onChange={handleInputChange}
        />
        {errors.location && <p className="error">{errors.location}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2>Professional Background</h2>
      <div className="form-group">
        <label>Current Employment Status</label>
        <div className="radio-group">
          {["employed", "partTime", "selfEmployed", "unemployed"].map((
            status,
          ) => (
            <div className="radio-option" key={status}>
              <input
                type="radio"
                name="employmentStatus"
                value={status}
                checked={formData.employmentStatus === status}
                onChange={handleInputChange}
              />
              <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
          ))}
        </div>
        {errors.employmentStatus && (
          <p className="error">{errors.employmentStatus}</p>
        )}
      </div>

      {formData.employmentStatus === "employed" && (
        <div className="form-group">
          <label>Years in Current Position</label>
          <input
            type="number"
            name="yearsEmployed"
            value={formData.yearsEmployed || ""}
            onChange={handleInputChange}
          />
          {errors.yearsEmployed && (
            <p className="error">{errors.yearsEmployed}</p>
          )}
        </div>
      )}

      <div className="form-group">
        <label>Technical Skills</label>
        <div className="checkbox-group">
          {["javascript", "python", "java", "sql", "react", "node"].map((
            skill,
          ) => (
            <div className="checkbox-option" key={skill}>
              <input
                type="checkbox"
                name="skills"
                value={skill}
                checked={formData.skills?.includes(skill)}
                onChange={handleInputChange}
              />
              <span>{skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Experience Level</label>
        <select
          name="experienceLevel"
          value={formData.experienceLevel || ""}
          onChange={handleInputChange}
        >
          <option value="">Select...</option>
          <option value="entry">Entry Level (0-2 years)</option>
          <option value="intermediate">Intermediate (3-5 years)</option>
          <option value="senior">Senior (6-10 years)</option>
          <option value="expert">Expert (10+ years)</option>
        </select>
        {errors.experienceLevel && (
          <p className="error">{errors.experienceLevel}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2>Career Goals & Preferences</h2>
      <div className="form-group">
        <label>Career Goals (Brief description)</label>
        <textarea
          name="careerGoals"
          value={formData.careerGoals || ""}
          onChange={handleInputChange}
          rows={4}
        />
        {errors.careerGoals && <p className="error">{errors.careerGoals}</p>}
      </div>

      <div className="form-group">
        <label>
          Expected Salary Range (in thousands): ${formData.salaryRange}k
        </label>
        <input
          type="range"
          name="salaryRange"
          min="30"
          max="200"
          step="10"
          value={formData.salaryRange}
          onChange={handleInputChange}
          style={{ width: "100%" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>$30k</span>
          <span>$200k</span>
        </div>
      </div>

      <div className="form-group">
        <label>Preferred Work Style</label>
        <div className="radio-group">
          {["remote", "hybrid", "office"].map((style) => (
            <div className="radio-option" key={style}>
              <input
                type="radio"
                name="preferredWorkStyle"
                value={style}
                checked={formData.preferredWorkStyle === style}
                onChange={handleInputChange}
              />
              <span>{style.charAt(0).toUpperCase() + style.slice(1)}</span>
            </div>
          ))}
        </div>
        {errors.preferredWorkStyle && (
          <p className="error">{errors.preferredWorkStyle}</p>
        )}
      </div>

      <div className="form-group">
        <div className="checkbox-option">
          <input
            type="checkbox"
            name="willingToRelocate"
            checked={formData.willingToRelocate}
            onChange={handleInputChange}
          />
          <span>Willing to Relocate</span>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div>
      <div className="modal-backdrop" onClick={() => setShowResults(false)} />
      <div className="results-modal">
        <button className="close-button" onClick={() => setShowResults(false)}>
          &times;
        </button>
        <h2 style={{ marginBottom: "20px" }}>Survey Results</h2>

        <div className="result-section">
          <div className="result-title">Personal Information</div>
          <p>
            <strong>Name:</strong> {formData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Age:</strong> {formData.age}
          </p>
          <p>
            <strong>Location:</strong> {formData.location}
          </p>
        </div>

        <div className="result-section">
          <div className="result-title">Professional Background</div>
          <p>
            <strong>Employment:</strong> {formData.employmentStatus}
          </p>
          {formData.employmentStatus === "employed" && (
            <p>
              <strong>Years Employed:</strong> {formData.yearsEmployed}
            </p>
          )}
          <p>
            <strong>Experience Level:</strong> {formData.experienceLevel}
          </p>
          <p>
            <strong>Skills:</strong> {formData.skills?.join(", ")}
          </p>
        </div>

        <div className="result-section">
          <div className="result-title">Career Goals & Preferences</div>
          <p>
            <strong>Career Goals:</strong> {formData.careerGoals}
          </p>
          <p>
            <strong>Expected Salary:</strong> ${formData.salaryRange}k
          </p>
          <p>
            <strong>Preferred Work Style:</strong> {formData.preferredWorkStyle}
          </p>
          <p>
            <strong>Willing to Relocate:</strong>{" "}
            {formData.willingToRelocate ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="form-container">
      <h1
        style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}
      >
        Career Development Survey
      </h1>

      {renderStepIndicator()}

      <form onSubmit={(e) => e.preventDefault()}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button type="button" onClick={handleBack}>
              Back
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            style={{ marginLeft: "auto" }}
          >
            {currentStep === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </form>

      {showResults && renderResults()}
    </div>
  );
}
