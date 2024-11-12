// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Calendar, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Award, Code, BookOpen } from 'lucide-react';
// import { getResumeById } from '../services/api';

// const ResumeViewer = () => {
//     // fetch the id from the URL
//     const { id } = useParams();
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResume = async () => {
//       try {
//         // const response = await fetch(`/api/resumes/${id}`);
//         const response = await getResumeById(id);
//         console.log("response: ",response);
//         if (!response.ok) throw new Error('Failed to fetch resume');
//         const data = await response.json();
//         setResume(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResume();
//   }, [id]);

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="min-h-screen flex items-center justify-center text-red-500">
//       Error: {error}
//     </div>
//   );

//   if (!resume) return null;

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
//       {/* Header Section */}
//       <header className="mb-8 border-b pb-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">{resume.personalInfo.fullName}</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
//           <div className="flex items-center gap-2">
//             <Mail className="w-4 h-4" />
//             <a href={`mailto:${resume.personalInfo.email}`} className="hover:text-blue-500">
//               {resume.personalInfo.email}
//             </a>
//           </div>
//           <div className="flex items-center gap-2">
//             <Phone className="w-4 h-4" />
//             <span>{resume.personalInfo.phone}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="w-4 h-4" />
//             <span>{resume.personalInfo.location}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Linkedin className="w-4 h-4" />
//             <a href={resume.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
//               LinkedIn Profile
//             </a>
//           </div>
//         </div>
//       </header>

//       {/* Experience Section */}
//       <section className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <Briefcase className="w-5 h-5 text-blue-500" />
//           <h2 className="text-2xl font-semibold text-gray-800">Professional Experience</h2>
//         </div>
//         <div className="space-y-6">
//           {resume.experience.map((exp, index) => (
//             <div key={index} className="pl-4 border-l-2 border-gray-200">
//               <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
//               <div className="text-gray-600 mb-2">{exp.company}</div>
//               <div className="flex items-center gap-2 text-gray-500 mb-2">
//                 <Calendar className="w-4 h-4" />
//                 <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
//               </div>
//               <p className="text-gray-600">{exp.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Education Section */}
//       <section className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <BookOpen className="w-5 h-5 text-blue-500" />
//           <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
//         </div>
//         <div className="space-y-4">
//           {resume.education.map((edu, index) => (
//             <div key={index} className="pl-4 border-l-2 border-gray-200">
//               <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
//               <div className="text-gray-600">{edu.institution}</div>
//               <div className="flex items-center gap-4 text-gray-500">
//                 <span>Graduation: {edu.graduationYear}</span>
//                 <span>GPA: {edu.gpa}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Skills Section */}
//       <section className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <Code className="w-5 h-5 text-blue-500" />
//           <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {resume.skills.map((skill, index) => (
//             <span
//               key={index}
//               className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
//             >
//               {skill}
//             </span>
//           ))}
//         </div>
//       </section>

//       {/* Projects Section */}
//       <section className="mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <Award className="w-5 h-5 text-blue-500" />
//           <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
//         </div>
//         <div className="space-y-6">
//           {resume.projects.map((project, index) => (
//             <div key={index} className="pl-4 border-l-2 border-gray-200">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
//                 {project.link && (
//                   <a
//                     href={project.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
//                   >
//                     <Github className="w-4 h-4" />
//                     <span>View Project</span>
//                   </a>
//                 )}
//               </div>
//               <div className="text-gray-500 mb-2">
//                 Technologies: {project.technologies}
//               </div>
//               <p className="text-gray-600">{project.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ResumeViewer;

// -----------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Award, Code, BookOpen } from 'lucide-react';
import { getResumeById } from '../services/api';

const ResumeViewer = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await getResumeById(id);
        console.log("response: ", response);
        
        if (!response.success) {
          throw new Error('Failed to fetch resume');
        }
        
        setResume(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-xl mb-2">Error loading resume</div>
        <div className="text-gray-600">{error}</div>
      </div>
    </div>
  );

  if (!resume) return null;

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen shadow-lg rounded-lg">
      {/* Header Section */}
      <header className="mb-8 border-b pb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{resume.personalInfo.fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          {resume.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${resume.personalInfo.email}`} className="hover:text-blue-500 transition-colors">
                {resume.personalInfo.email}
              </a>
            </div>
          )}
          
          {resume.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{resume.personalInfo.phone}</span>
            </div>
          )}
          
          {resume.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{resume.personalInfo.location}</span>
            </div>
          )}
          
          {resume.personalInfo.linkedIn && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <a 
                href={resume.personalInfo.linkedIn} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Experience Section */}
      {resume.experience && resume.experience.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Professional Experience</h2>
          </div>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <div key={index} className="pl-4 border-l-2 border-gray-200 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                <div className="text-gray-600 mb-2">{exp.company}</div>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <p className="text-gray-600 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {resume.education && resume.education.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
          </div>
          <div className="space-y-4">
            {resume.education.map((edu, index) => (
              <div key={index} className="pl-4 border-l-2 border-gray-200 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                <div className="text-gray-600">{edu.institution}</div>
                <div className="flex items-center gap-4 text-gray-500">
                  <span>Graduation: {edu.graduationYear}</span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
          </div>
          <div className="space-y-6">
            {resume.projects.map((project, index) => (
              <div key={index} className="pl-4 border-l-2 border-gray-200 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Project</span>
                    </a>
                  )}
                </div>
                {project.technologies && (
                  <div className="text-gray-500 mb-2">
                    Technologies: {project.technologies}
                  </div>
                )}
                <p className="text-gray-600 whitespace-pre-line">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumeViewer;