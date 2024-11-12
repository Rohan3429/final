// import React, { useState } from 'react';
// import { Plus, Trash2 } from 'lucide-react';
// import { createResume } from '../services/api';

// const ResumeBuilder = () => {
//     const [formData, setFormData] = useState({
//         personalInfo: {
//             fullName: '',
//             email: '',
//             phone: '',
//             location: '',
//             linkedIn: '',
//         },
//         education: [{
//             degree: '',
//             institution: '',
//             graduationYear: '',
//             gpa: '',
//         }],
//         experience: [{
//             company: '',
//             position: '',
//             startDate: '',
//             endDate: '',
//             description: '',
//         }],
//         skills: [''],
//         projects: [{
//             name: '',
//             description: '',
//             technologies: '',
//             link: '',
//         }],
//     });

//     const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

//     const handlePersonalInfoChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             personalInfo: {
//                 ...prev.personalInfo,
//                 [name]: value
//             }
//         }));
//     };

//     const handleArrayFieldChange = (section, index, field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [section]: prev[section].map((item, i) =>
//                 i === index ? (field ? { ...item, [field]: value } : value) : item
//             )
//         }));
//     };

//     const addArrayField = (section) => {
//         setFormData(prev => ({
//             ...prev,
//             [section]: [...prev[section],
//             section === 'education' ? {
//                 degree: '',
//                 institution: '',
//                 graduationYear: '',
//                 gpa: '',
//             } :
//                 section === 'experience' ? {
//                     company: '',
//                     position: '',
//                     startDate: '',
//                     endDate: '',
//                     description: '',
//                 } :
//                     section === 'projects' ? {
//                         name: '',
//                         description: '',
//                         technologies: '',
//                         link: '',
//                     } :
//                         ''
//             ]
//         }));
//     };

//     const removeArrayField = (section, index) => {
//         setFormData(prev => ({
//             ...prev,
//             [section]: prev[section].filter((_, i) => i !== index)
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitStatus({ type: 'info', message: 'Submitting...' });

//         try {
//             //   Here you would make your API call to save the data
//             const response = await createResume(formData);
//             console.log('Resume data saved:', response);
//             setSubmitStatus({
//                 type: 'success',
//                 message: 'Resume data saved successfully!'
//             });
//         } catch (error) {
//             setSubmitStatus({
//                 type: 'error',
//                 message: 'Failed to save resume data. Please try again.'
//             });
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             <div className="bg-white rounded-lg shadow-md">
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold mb-6">Resume Builder</h2>

//                     <form onSubmit={handleSubmit} className="space-y-8">
//                         {/* Personal Information */}
//                         <div className="space-y-4">
//                             <h3 className="text-lg font-semibold">Personal Information</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Full Name</label>
//                                     <input
//                                         type="text"
//                                         name="fullName"
//                                         value={formData.personalInfo.fullName}
//                                         onChange={handlePersonalInfoChange}
//                                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Email</label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={formData.personalInfo.email}
//                                         onChange={handlePersonalInfoChange}
//                                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Phone</label>
//                                     <input
//                                         type="tel"
//                                         name="phone"
//                                         value={formData.personalInfo.phone}
//                                         onChange={handlePersonalInfoChange}
//                                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Location</label>
//                                     <input
//                                         type="text"
//                                         name="location"
//                                         value={formData.personalInfo.location}
//                                         onChange={handlePersonalInfoChange}
//                                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Education */}
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-semibold">Education</h3>
//                                 <button
//                                     type="button"
//                                     onClick={() => addArrayField('education')}
//                                     className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                                 >
//                                     <Plus className="w-4 h-4 mr-1" />
//                                     Add Education
//                                 </button>
//                             </div>
//                             {formData.education.map((edu, index) => (
//                                 <div key={index} className="p-4 border rounded-lg relative">
//                                     <button
//                                         type="button"
//                                         onClick={() => removeArrayField('education', index)}
//                                         className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//                                     >
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="block text-sm font-medium mb-1">Degree</label>
//                                             <input
//                                                 type="text"
//                                                 value={edu.degree}
//                                                 onChange={(e) => handleArrayFieldChange('education', index, 'degree', e.target.value)}
//                                                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium mb-1">Institution</label>
//                                             <input
//                                                 type="text"
//                                                 value={edu.institution}
//                                                 onChange={(e) => handleArrayFieldChange('education', index, 'institution', e.target.value)}
//                                                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 required
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Experience */}
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-semibold">Work Experience</h3>
//                                 <button
//                                     type="button"
//                                     onClick={() => addArrayField('experience')}
//                                     className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                                 >
//                                     <Plus className="w-4 h-4 mr-1" />
//                                     Add Experience
//                                 </button>
//                             </div>
//                             {formData.experience.map((exp, index) => (
//                                 <div key={index} className="p-4 border rounded-lg relative">
//                                     <button
//                                         type="button"
//                                         onClick={() => removeArrayField('experience', index)}
//                                         className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//                                     >
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="block text-sm font-medium mb-1">Company</label>
//                                             <input
//                                                 type="text"
//                                                 value={exp.company}
//                                                 onChange={(e) => handleArrayFieldChange('experience', index, 'company', e.target.value)}
//                                                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium mb-1">Position</label>
//                                             <input
//                                                 type="text"
//                                                 value={exp.position}
//                                                 onChange={(e) => handleArrayFieldChange('experience', index, 'position', e.target.value)}
//                                                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium mb-1">Description</label>
//                                             <textarea
//                                                 value={exp.description}
//                                                 onChange={(e) => handleArrayFieldChange('experience', index, 'description', e.target.value)}
//                                                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 rows="3"
//                                                 required
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Skills */}
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-semibold">Skills</h3>
//                                 <button
//                                     type="button"
//                                     onClick={() => addArrayField('skills')}
//                                     className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                                 >
//                                     <Plus className="w-4 h-4 mr-1" />
//                                     Add Skill
//                                 </button>
//                             </div>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                 {formData.skills.map((skill, index) => (
//                                     <div key={index} className="relative">
//                                         <input
//                                             type="text"
//                                             value={skill}
//                                             onChange={(e) => handleArrayFieldChange('skills', index, '', e.target.value)}
//                                             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             placeholder="Enter skill"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => removeArrayField('skills', index)}
//                                             className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700"
//                                         >
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="flex justify-end">
//                             <button
//                                 type="submit"
//                                 className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 Generate Resume
//                             </button>
//                         </div>

//                         {/* Status Message */}
//                         {submitStatus.message && (
//                             <div className={`p-4 rounded-md ${submitStatus.type === 'error' ? 'bg-red-100 text-red-700' :
//                                     submitStatus.type === 'success' ? 'bg-green-100 text-green-700' :
//                                         'bg-blue-100 text-blue-700'
//                                 }`}>
//                                 {submitStatus.message}
//                             </div>
//                         )}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ResumeBuilder;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { createResume } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ResumeBuilder = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            linkedIn: '',
        },
        education: [{
            degree: '',
            institution: '',
            graduationYear: '',
            gpa: '',
        }],
        experience: [{
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
        }],
        skills: [''],
        projects: [{
            name: '',
            description: '',
            technologies: '',
            link: '',
        }],
    });

    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [name]: value
            }
        }));
    };

    const handleArrayFieldChange = (section, index, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? (field ? { ...item, [field]: value } : value) : item
            )
        }));
    };

    const addArrayField = (section) => {
        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section],
                section === 'education' ? {
                    degree: '',
                    institution: '',
                    graduationYear: '',
                    gpa: '',
                } :
                section === 'experience' ? {
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                } :
                section === 'projects' ? {
                    name: '',
                    description: '',
                    technologies: '',
                    link: '',
                } :
                ''
            ]
        }));
    };

    const removeArrayField = (section, index) => {
        if (formData[section].length > 1) {
            setFormData(prev => ({
                ...prev,
                [section]: prev[section].filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ type: 'info', message: 'Submitting...' });

        try {
            const response = await createResume(formData);
            setSubmitStatus({
                type: 'success',
                message: 'Resume created successfully!'
            });
            setTimeout(() => {
                navigate('/student');
            }, 1000);
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: error.message || 'Failed to create resume. Please try again.'
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Resume Builder</h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Full Name*</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.personalInfo.fullName}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.personalInfo.email}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone*</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.personalInfo.phone}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location*</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.personalInfo.location}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">LinkedIn</label>
                                    <input
                                        type="url"
                                        name="linkedIn"
                                        value={formData.personalInfo.linkedIn}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Education</h3>
                                <button
                                    type="button"
                                    onClick={() => addArrayField('education')}
                                    className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Education
                                </button>
                            </div>
                            {formData.education.map((edu, index) => (
                                <div key={index} className="p-4 border rounded-lg relative">
                                    <button
                                        type="button"
                                        onClick={() => removeArrayField('education', index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        disabled={formData.education.length === 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Degree*</label>
                                            <input
                                                type="text"
                                                value={edu.degree}
                                                onChange={(e) => handleArrayFieldChange('education', index, 'degree', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Institution*</label>
                                            <input
                                                type="text"
                                                value={edu.institution}
                                                onChange={(e) => handleArrayFieldChange('education', index, 'institution', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Graduation Year*</label>
                                            <input
                                                type="text"
                                                value={edu.graduationYear}
                                                onChange={(e) => handleArrayFieldChange('education', index, 'graduationYear', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">GPA</label>
                                            <input
                                                type="text"
                                                value={edu.gpa}
                                                onChange={(e) => handleArrayFieldChange('education', index, 'gpa', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Experience */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Work Experience</h3>
                                <button
                                    type="button"
                                    onClick={() => addArrayField('experience')}
                                    className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Experience
                                </button>
                            </div>
                            {formData.experience.map((exp, index) => (
                                <div key={index} className="p-4 border rounded-lg relative">
                                    <button
                                        type="button"
                                        onClick={() => removeArrayField('experience', index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        disabled={formData.experience.length === 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Company*</label>
                                            <input
                                                type="text"
                                                value={exp.company}
                                                onChange={(e) => handleArrayFieldChange('experience', index, 'company', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Position*</label>
                                            <input
                                                type="text"
                                                value={exp.position}
                                                onChange={(e) => handleArrayFieldChange('experience', index, 'position', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Start Date*</label>
                                            <input
                                                type="date"
                                                value={exp.startDate}
                                                onChange={(e) => handleArrayFieldChange('experience', index, 'startDate', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">End Date</label>
                                            <input
                                                type="date"
                                                value={exp.endDate}
                                                onChange={(e) => handleArrayFieldChange('experience', index, 'endDate', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-1">Description*</label>
                                            <textarea
                                                value={exp.description}
                                                onChange={(e) => handleArrayFieldChange('experience', index, 'description', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Skills */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Skills</h3>
                                <button
                                    type="button"
                                    onClick={() => addArrayField('skills')}
                                    className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Skill
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {formData.skills.map((skill, index) => (
                                    <div key={index} className="relative">
                                        <input
                                            type="text"
                                            value={skill}
                                            onChange={(e) => handleArrayFieldChange('skills', index, '', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter skill"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeArrayField('skills', index)}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700"
                                            disabled={formData.skills.length === 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Projects</h3>
                                <button
                                    type="button"
                                    onClick={() => addArrayField('projects')}
                                    className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Project
                                </button>
                            </div>
                            {formData.projects.map((project, index) => (
                                <div key={index} className="p-4 border rounded-lg relative">
                                    <button
                                        type="button"
                                        onClick={() => removeArrayField('projects', index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        disabled={formData.projects.length === 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Project Name*</label>
                                            <input
                                                type="text"
                                                value={project.name}
                                                onChange={(e) => handleArrayFieldChange('projects', index, 'name', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Technologies</label>
                                            <input
                                                type="text"
                                                value={project.technologies}
                                                onChange={(e) => handleArrayFieldChange('projects', index, 'technologies', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-1">Description*</label>
                                            <textarea
                                                value={project.description}
                                                onChange={(e) => handleArrayFieldChange('projects', index, 'description', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows="3"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-1">Project Link</label>
                                            <input
                                                type="url"
                                                value={project.link}
                                                onChange={(e) => handleArrayFieldChange('projects', index, 'link', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="https://"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Generate Resume
                            </button>
                        </div>

                        {/* Status Message */}
                        {submitStatus.message && (
                            <div className={`p-4 rounded-md ${
                                submitStatus.type === 'error' ? 'bg-red-100 text-red-700' :
                                submitStatus.type === 'success' ? 'bg-green-100 text-green-700' :
                                'bg-blue-100 text-blue-700'
                            }`}>
                                {submitStatus.message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;