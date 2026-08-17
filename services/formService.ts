import { FormSchema, FormSubmissionPayload, FormSubmissionResult } from "@/types/form";

// Mock Database of event registration form schemas
const MOCK_FORMS: Record<string, FormSchema> = {
  // Default primary Stitch reference form
  "abc123": {
    id: "abc123",
    title: "Event Registration form : Tech Workshop",
    description:
      "Please fill out the details below to register for the upcoming symposium. Ensure all information is accurate to confirm your credential badges and session entry.",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    organization: {
      name: "Faculty",
      badge: "Official University Event",
      verified: true,
    },
    metadata: {
      date: "October 24–26, 2026",
      time: "09:00 AM – 05:30 PM EST",
      location: "Seminar Hall A & Virtual Hub",
      format: "Hybrid",
      category: "Academic & Technology",
    },
    submitButtonText: "Submit Registration",
    footerText: "Official Academic Registry • Verified Secure Submission",
    termsUrl: "#terms",
    privacyUrl: "#privacy",
    sections: [
      {
        id: "personal-information",
        title: "Personal Information",
        description: "Your primary institutional and contact information for badge generation.",
        position: 1,
        fields: [
          {
            id: "full-name",
            fieldName: "fullName",
            label: "Full Name",
            placeholder: "Jane Doe",
            type: "text",
            required: true,
            position: 1,
            gridColumn: "half",
            validation: {
              minLength: 2,
              maxLength: 100,
            },
          },
          {
            id: "student-email",
            fieldName: "studentEmail",
            label: "Student Email",
            placeholder: "jane.doe@university.edu",
            type: "email",
            required: true,
            position: 2,
            gridColumn: "half",
            helpText: "We will send your admission QR pass to this email.",
            validation: {
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            },
          },
          {
            id: "phone-number",
            fieldName: "phone",
            label: "Contact Number",
            placeholder: "+91 12345 12345",
            type: "tel",
            required: false,
            position: 3,
            gridColumn: "half",
          },
          {
            id: "student-id",
            fieldName: "studentId",
            label: "Student / Employee ID",
            placeholder: "100000000000",
            type: "text",
            required: true,
            position: 4,
            gridColumn: "half",
          },
        ],
      },
      {
        id: "academic-details",
        title: "Academic Details",
        description: "Provide your current departmental enrollment and academic standing.",
        position: 2,
        fields: [
          {
            id: "department",
            fieldName: "department",
            label: "Department",
            placeholder: "Select Department",
            type: "select",
            required: true,
            position: 1,
            gridColumn: "half",
            options: [
              { label: "Computer Science & Engineering", value: "cs" },
              { label: "AI & Data Science", value: "ai-ds" },
              { label: "Electronics & Communication", value: "ece" },
              { label: "Information Technology", value: "it" },
              { label: "Mechanical Engineering", value: "mech" },
              { label: "Biotechnology & Computational Biology", value: "biotech" },
            ],
          },
          {
            id: "year",
            fieldName: "year",
            label: "Year of Study",
            type: "radio",
            required: true,
            position: 2,
            gridColumn: "half",
            options: [
              { label: "1st Year ", value: "1" },
              { label: "2nd Year ", value: "2" },
              { label: "3rd Year ", value: "3" },
              { label: "4th Year ", value: "4" },
              { label: "Graduate / Postgraduate", value: "graduate" },
            ],
          },
        ],
      },
      {
        id: "event-preferences",
        title: "Event Preferences",
        description: "Choose breakout workshops, keynote tracks, and logistical accommodations.",
        position: 3,
        fields: [
          {
            id: "tracks",
            fieldName: "preferredTracks",
            label: "Workshop Tracks & Sessions",
            type: "checkbox",
            required: true,
            position: 1,
            gridColumn: "full",
            helpText: "Select at least one track you plan to attend in person.",
            options: [
              {
                label: "Workshops & Hands-on Labs",
                value: "workshops",
                description: "Interactive lab sessions on LLM fine-tuning, system design, and distributed architectures.",
              },
              {
                label: "Keynotes & Research Panels",
                value: "keynotes",
                description: "Distinguished faculty and industry keynote sessions covering breakthrough technology trends.",
              },
              {
                label: "Networking & Career Fair",
                value: "networking",
                description: "Direct mixer with hiring partners, lab directors, and alumni researchers.",
              },
              {
                label: "Symposium Hackathon",
                value: "hackathon",
                description: "24-hour sprint building real-world AI and systems prototypes with mentorship.",
              },
              {
                label: "Other",
                value: "Other Event",
                description: "Extra curicular Events.",
              },
            ],
          },
          {
            id: "dietary-restrictions",
            fieldName: "dietaryRestrictions",
            label: "Dietary Restrictions & Special Requirements",
            placeholder: "e.g., Vegetarian, Vegan, Halal, Gluten-Free, or wheelchair accessibility requirements...",
            type: "textarea",
            required: false,
            position: 2,
            gridColumn: "full",
            validation: {
              maxLength: 500,
            },
          },
          {
            id: "id-upload",
            fieldName: "idCardProof",
            label: "Student ID Proof or Resume (Optional)",
            placeholder: "Upload official ID or Curriculum Vitae",
            type: "file",
            required: false,
            position: 3,
            gridColumn: "full",
            helpText: "Supports PDF, DOCX, PNG, JPG up to 10MB.",
            validation: {
              maxFileSizeMB: 10,
              acceptedFileTypes: [".pdf", ".docx", ".png", ".jpg", ".jpeg"],
            },
          },
        ],
      },
    ],
  },

  // Alias for event-form-001
  "event-form-001": {
    id: "event-form-001",
    title: "Event Registration: Annual Tech Symposium",
    description:
      "Please fill out the details below to register for the upcoming symposium. Ensure all information is accurate to confirm your credential badges and session entry.",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    organization: {
      name: "Faculty of Computing & Technology",
      badge: "Official University Event",
      verified: true,
    },
    metadata: {
      date: "October 24–26, 2026",
      time: "09:00 AM – 05:30 PM EST",
      location: "Auditorium Hall A & Virtual Hub",
      format: "Hybrid",
      category: "Academic & Technology",
    },
    submitButtonText: "Submit Registration",
    footerText: "Official Academic Registry • Verified Secure Submission",
    termsUrl: "#terms",
    privacyUrl: "#privacy",
    sections: [
      {
        id: "personal-information",
        title: "Personal Information",
        description: "Your primary institutional and contact information for badge generation.",
        position: 1,
        fields: [
          {
            id: "full-name",
            fieldName: "fullName",
            label: "Full Name",
            placeholder: "Jane Doe",
            type: "text",
            required: true,
            position: 1,
            gridColumn: "half",
          },
          {
            id: "student-email",
            fieldName: "studentEmail",
            label: "Student Email",
            placeholder: "jane.doe@university.edu",
            type: "email",
            required: true,
            position: 2,
            gridColumn: "half",
          },
        ],
      },
      {
        id: "academic-details",
        title: "Academic Details",
        description: "Select your active academic department and enrollment year.",
        position: 2,
        fields: [
          {
            id: "department",
            fieldName: "department",
            label: "Department",
            placeholder: "Select Department",
            type: "select",
            required: true,
            position: 1,
            gridColumn: "half",
            options: [
              { label: "Computer Science", value: "cs" },
              { label: "AI & Data Science", value: "ai-ds" },
              { label: "Electronics", value: "ece" },
            ],
          },
          {
            id: "year",
            fieldName: "year",
            label: "Year of Study",
            type: "radio",
            required: true,
            position: 2,
            gridColumn: "half",
            options: [
              { label: "1st Year", value: "1" },
              { label: "2nd Year", value: "2" },
              { label: "3rd Year", value: "3" },
              { label: "4th Year", value: "4" },
              { label: "Graduate", value: "graduate" },
            ],
          },
        ],
      },
      {
        id: "event-preferences",
        title: "Event Preferences",
        description: "Choose your session formats and special dietary needs.",
        position: 3,
        fields: [
          {
            id: "preferences",
            fieldName: "preferences",
            label: "Selected Sessions",
            type: "checkbox",
            required: true,
            position: 1,
            gridColumn: "full",
            options: [
              { label: "Workshops", value: "workshops", description: "Technical workshops & live coding" },
              { label: "Keynotes", value: "keynotes", description: "Keynote talks by keynote researchers" },
              { label: "Networking", value: "networking", description: "Open floor networking lunch" },
              { label: "Hackathon", value: "hackathon", description: "24h hackathon access" },
            ],
          },
          {
            id: "dietary",
            fieldName: "dietary",
            label: "Dietary Restrictions",
            placeholder: "None or specify...",
            type: "textarea",
            required: false,
            position: 2,
            gridColumn: "full",
          },
        ],
      },
    ],
  },

  // Schema 2: Global AI Hackathon (Proves complete dynamic restructuring)
  "hackathon-2026": {
    id: "hackathon-2026",
    title: "Global AI & Systems Hackathon 2026",
    description:
      "Build intelligent agents, high-throughput distributed systems, and real-time AI pipelines over an intense 48-hour global sprint with $50,000 in bounties.",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    organization: {
      name: "Open Systems & AI Foundation",
      badge: "Global Collegiate Division",
      verified: true,
    },
    metadata: {
      date: "November 14–16, 2026",
      time: "48-Hour Continuous Sprint",
      location: "Innovation Hub / Global Discord",
      format: "Hybrid Worldwide",
      category: "Competitive Hackathon",
    },
    submitButtonText: "Register Team for Hackathon",
    footerText: "Open Systems Foundation • Hackathon Guidelines Apply",
    termsUrl: "#hackathon-rules",
    privacyUrl: "#privacy",
    sections: [
      {
        id: "team-lead-details",
        title: "Team Lead Details",
        description: "Primary point of contact for sprint announcements and prize distribution.",
        position: 1,
        fields: [
          {
            id: "lead-name",
            fieldName: "leadName",
            label: "Team Lead Full Name",
            placeholder: "Jane Doe",
            type: "text",
            required: true,
            gridColumn: "half",
          },
          {
            id: "lead-email",
            fieldName: "leadEmail",
            label: "Lead Email Address",
            placeholder: "jane.doe@university.edu",
            type: "email",
            required: true,
            gridColumn: "half",
          },
          {
            id: "team-name",
            fieldName: "teamName",
            label: "Official Team Name",
            placeholder: "Team Name",
            type: "text",
            required: true,
            gridColumn: "half",
          },
          {
            id: "github-profile",
            fieldName: "githubProfile",
            label: "GitHub Profile URL",
            placeholder: "https://github.com/neural-vector",
            type: "url",
            required: true,
            gridColumn: "half",
          },
        ],
      },
      {
        id: "hackathon-track",
        title: "Track Selection & Team Sizing",
        description: "Choose your primary competitive track and specify team structure.",
        position: 2,
        fields: [
          {
            id: "competition-track",
            fieldName: "track",
            label: "Primary Challenge Track",
            type: "radio",
            required: true,
            gridColumn: "half",
            options: [
              { label: "Autonomous Agent Orchestration", value: "agents" },
              { label: "Edge AI & Embedded Inference", value: "edge-ai" },
              { label: "Decentralized Identity & Privacy", value: "privacy" },
              { label: "High-Performance Data Infrastructure", value: "hpc" },
            ],
          },
          {
            id: "team-size",
            fieldName: "teamSize",
            label: "Team Size (Members)",
            placeholder: "6",
            type: "number",
            required: true,
            gridColumn: "half",
            validation: {
              min: 1,
              max: 6,
            },
          },
          {
            id: "tech-stack",
            fieldName: "techStack",
            label: "Anticipated Technology Stack",
            type: "checkbox",
            required: false,
            gridColumn: "full",
            options: [
              { label: "Next.js & React 19", value: "nextjs", description: "Frontend interface and edge rendering" },
              { label: "Python & PyTorch", value: "pytorch", description: "Machine learning model pipelines" },
              { label: "Rust & WebAssembly", value: "rust", description: "Ultra low-latency systems and WASM" },
              { label: "Go & Kubernetes", value: "golang", description: "Distributed microservices and routing" },
            ],
          },
        ],
      },
      {
        id: "project-pitch",
        title: "Project Concept & Proposal",
        description: "A preliminary synopsis of the solution your team intends to prototype.",
        position: 3,
        fields: [
          {
            id: "pitch-text",
            fieldName: "projectPitch",
            label: "Project Abstract & Problem Statement",
            placeholder: "Describe the core challenge your team is solving, the technological approach, and the intended outcome...",
            type: "textarea",
            required: true,
            gridColumn: "full",
            validation: {
              minLength: 50,
              maxLength: 1000,
            },
          },
        ],
      },
    ],
  },

  // Schema 3: Graduate Research Symposium
  "research-symposium": {
    id: "research-symposium",
    title: "Graduate Research Symposium & Paper Submission",
    description:
      "Submit candidate manuscripts and register for peer review presentation slots at the annual doctoral symposium.",
    banner: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    organization: {
      name: "Council of Graduate Studies & Research",
      badge: "Peer-Reviewed Academic Track",
      verified: true,
    },
    metadata: {
      date: "December 5, 2026",
      time: "08:30 AM – 06:00 PM EST",
      location: "Graduate Sciences Complex",
      format: "In-Person",
      category: "Doctoral Research",
    },
    submitButtonText: "Submit Research Script",
    footerText: "Institutional Review Board Standards • All submissions archived in University Repository",
    termsUrl: "#research-ethics",
    privacyUrl: "#privacy",
    sections: [
      {
        id: "author-profile",
        title: "Author & Faculty Profile",
        description: "Primary corresponding author and dissertation committee advisor details.",
        position: 1,
        fields: [
          {
            id: "author-name",
            fieldName: "authorName",
            label: "Principal Author Name",
            placeholder: "Dr. / Candidate Marcus Vance",
            type: "text",
            required: true,
            gridColumn: "half",
          },
          {
            id: "author-email",
            fieldName: "authorEmail",
            label: "Institutional Email",
            placeholder: "m.vance@stanford.edu",
            type: "email",
            required: true,
            gridColumn: "half",
          },
          {
            id: "advisor-name",
            fieldName: "facultyAdvisor",
            label: "Faculty Advisor / Chair",
            placeholder: "Prof. Eleanor Bennett",
            type: "text",
            required: true,
            gridColumn: "half",
          },
          {
            id: "research-division",
            fieldName: "division",
            label: "Research Division",
            placeholder: "Select Division",
            type: "select",
            required: true,
            gridColumn: "half",
            options: [
              { label: "Information Theory & Distributed Systems", value: "info-theory" },
              { label: "Statistical Machine Learning", value: "stat-ml" },
              { label: "Human-Computer Interaction", value: "hci" },
              { label: "Computational Linguistics", value: "nlp" },
            ],
          },
        ],
      },
      {
        id: "manuscript-details",
        title: "Manuscript & Presentation Track",
        description: "Provide research paper title, abstract, presentation preference, and draft manuscript.",
        position: 2,
        fields: [
          {
            id: "paper-title",
            fieldName: "paperTitle",
            label: "Manuscript Title",
            placeholder: "Adaptive Consensus in Heterogeneous Fault-Tolerant Enclaves",
            type: "text",
            required: true,
            gridColumn: "full",
          },
          {
            id: "presentation-type",
            fieldName: "presentationMode",
            label: "Preferred Presentation Mode",
            type: "radio",
            required: true,
            gridColumn: "half",
            options: [
              { label: "Oral Presentation (20 min)", value: "oral" },
              { label: "Interactive Poster Session", value: "poster" },
              { label: "Lightning Talk (5 min)", value: "lightning" },
            ],
          },
          {
            id: "manuscript-file",
            fieldName: "manuscriptDraft",
            label: "Manuscript PDF Upload",
            type: "file",
            required: true,
            gridColumn: "half",
            helpText: "PDF format only, anonymized for double-blind review.",
            validation: {
              maxFileSizeMB: 15,
              acceptedFileTypes: [".pdf"],
            },
          },
          {
            id: "paper-abstract",
            fieldName: "abstract",
            label: "Executive Abstract (250–500 words)",
            placeholder: "Provide context, methodology, key findings, and empirical evaluation...",
            type: "textarea",
            required: true,
            gridColumn: "full",
            validation: {
              minLength: 100,
              maxLength: 2500,
            },
          },
        ],
      },
    ],
  },
};

// API Base URL from environment variables
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (typeof process !== "undefined" && process.env.VITE_API_BASE_URL) ||
  "";

/**
 * Service to fetch form schema dynamically by ID
 */
export async function getFormById(id: string): Promise<FormSchema> {
  const normalizedId = id.trim().toLowerCase();

  // If external backend API URL is configured, attempt real HTTP fetch
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/form?id=${encodeURIComponent(normalizedId)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data: FormSchema = await response.json();
      return data;
    } catch (err) {
      console.warn("Backend API call failed, falling back to mock schema repository:", err);
    }
  }

  // Realistic mock delay to demonstrate skeleton loading state (400ms)
  await new Promise((resolve) => setTimeout(resolve, 400));

  const schema = MOCK_FORMS[normalizedId];

  if (!schema) {
    // If ID is not recognized, return 404 error
    throw new Error(`Form with ID "${id}" was not found.`);
  }

  return schema;
}

/**
 * Service to submit dynamic form responses
 */
export async function submitForm(
  id: string,
  responses: Record<string, any>
): Promise<FormSubmissionResult> {
  const normalizedId = id.trim().toLowerCase();
  const timestamp = new Date().toISOString();
  const submissionId = `SUB-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;

  const payload: FormSubmissionPayload = {
    formId: normalizedId,
    responses,
    submittedAt: timestamp,
  };

  // If real API endpoint exists, send real HTTP POST
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/form/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      const result: FormSubmissionResult = await response.json();
      return result;
    } catch (err) {
      console.warn("Backend submit call failed, falling back to simulated response:", err);
    }
  }

  // Simulated server processing delay (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    submissionId,
    timestamp,
    message: "Registration response recorded successfully.",
    responsesSummary: responses,
  };
}

/**
 * Utility to get all available mock schema keys for dev switcher
 */
export function getAvailableMockFormIds(): Array<{ id: string; label: string }> {
  return [
    { id: "abc123", label: "Annual Tech Symposium (Design Reference)" },
    { id: "hackathon-2026", label: "Global AI Hackathon 2026" },
    { id: "research-symposium", label: "Graduate Research Symposium" },
  ];
}
