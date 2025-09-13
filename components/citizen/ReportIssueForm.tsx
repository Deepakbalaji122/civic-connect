
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useIssues } from '../../context/IssueContext';
import { Category, Priority, Issue } from '../../types';
import { CATEGORIES, PRIORITIES } from '../../constants';
import { suggestCategoryAndPriority } from '../../services/geminiService';

interface ReportIssueFormProps {
  onFormSubmit: () => void;
}

const ReportIssueForm: React.FC<ReportIssueFormProps> = ({ onFormSubmit }) => {
  const { addIssue } = useIssues();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(Category.Other);
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAiSuggest = async () => {
    if (!description) {
      setError("Please enter a description first to get AI suggestions.");
      return;
    }
    setIsSuggesting(true);
    setError(null);
    try {
      const suggestions = await suggestCategoryAndPriority(description);
      setCategory(suggestions.category);
      setPriority(suggestions.priority);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!title || !description || !location) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    const newIssueData: Omit<Issue, 'id' | 'submittedAt' | 'updatedAt' | 'status'> = {
      title,
      description,
      category,
      priority,
      location,
      imageUrl: imagePreview || `https://picsum.photos/seed/${title.replace(/\s/g, '')}/800/600`, // Use preview or a placeholder
    };

    // Simulate submission delay
    setTimeout(() => {
      addIssue(newIssueData);
      setIsSubmitting(false);
      setSuccess("Issue reported successfully!");
      // Reset form after a delay
      setTimeout(() => {
        onFormSubmit();
      }, 1500);
    }, 1000);
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Report a New Issue</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{error}</div>}
        {success && <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">{success}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Large pothole on Elm Street" required />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 123 Elm St, near the park" required />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
          <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Provide details about the issue..." required></textarea>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category & Priority</label>
            <div className="flex gap-4">
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className="flex-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="flex-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <button type="button" onClick={handleAiSuggest} disabled={isSuggesting || !description} className="flex-shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition">
            {isSuggesting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Suggesting...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                AI Suggest
              </>
            )}
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Upload Photo (Optional)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-auto object-cover rounded-md"/>
              ) : (
                <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
              <div className="flex text-sm text-slate-600 dark:text-slate-400">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*"/>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={onFormSubmit} className="px-6 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="inline-flex justify-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-wait">
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssueForm;
