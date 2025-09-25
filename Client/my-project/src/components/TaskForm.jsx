import { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import Button from './Button.jsx';
import Input from './Input.jsx';

const TaskForm = ({ task = null, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    titre: task?.titre || '',
    description: task?.description || '',
    photo: null,
    audio: null,
    startDate: task?.startDate ? new Date(task.startDate).toISOString().slice(0, 16) : '',
    endDate: task?.endDate ? new Date(task.endDate).toISOString().slice(0, 16) : ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(
    task?.photo ? `http://localhost:3000${task.photo}` : null
  );
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(
    task?.audio ? `http://localhost:3000${task.audio}` : null
  );
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);

  // Champs texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  // Upload image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormErrors(prev => ({ ...prev, photo: 'Veuillez sélectionner un fichier image' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormErrors(prev => ({ ...prev, photo: 'La taille du fichier ne doit pas dépasser 5MB' }));
      return;
    }

    setFormData(prev => ({ ...prev, photo: file }));

    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(file);

    if (formErrors.photo) setFormErrors(prev => ({ ...prev, photo: '' }));
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo: null }));
    setPreviewUrl(task?.photo ? `http://localhost:3000${task.photo}` : null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Enregistrement audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = e => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioPreviewUrl(URL.createObjectURL(blob));
        setFormData(prev => ({
          ...prev,
          audio: new File([blob], 'recording.webm', { type: 'audio/webm' })
        }));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Impossible d’accéder au micro:', err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const removeAudio = () => {
    setFormData(prev => ({ ...prev, audio: null }));
    setAudioPreviewUrl(null);
  };

  // Validation formulaire
  const validateForm = () => {
    const errors = {};
    if (!formData.titre.trim()) errors.titre = 'Le titre est requis';
    else if (formData.titre.trim().length < 3) errors.titre = 'Le titre doit contenir au moins 3 caractères';

    if (!formData.description.trim()) errors.description = 'La description est requise';
    else if (formData.description.trim().length < 10) errors.description = 'La description doit contenir au moins 10 caractères';

    // Validation des dates
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end <= start) {
        errors.endDate = 'La date de fin doit être après la date de début';
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Convertir les dates datetime-local en format ISO complet pour Prisma avec secondes actuelles
    const now = new Date();
    const currentSeconds = now.getSeconds().toString().padStart(2, '0');

    const submitData = {
      ...formData,
      ...(formData.startDate && { startDate: new Date(`${formData.startDate}:${currentSeconds}`).toISOString() }),
      ...(formData.endDate && { endDate: new Date(`${formData.endDate}:${currentSeconds}`).toISOString() })
    };

    try {
      await onSubmit(submitData);
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {task ? 'Modifier la tâche' : 'Nouvelle tâche'}
          </h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Titre"
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            error={formErrors.titre}
            placeholder="Titre de la tâche"
            required
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                formErrors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Description de la tâche"
              required
            />
            {formErrors.description && <p className="text-sm text-red-600">{formErrors.description}</p>}
          </div>

          {/* Date et heure de début */}
          <Input
            label="Date et heure de début (optionnel)"
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            error={formErrors.startDate}
          />

          {/* Date et heure de fin */}
          <Input
            label="Date et heure de fin (optionnel)"
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            error={formErrors.endDate}
          />

          {/* Photo */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Photo (optionnelle)</label>
            {previewUrl ? (
              <div className="relative">
                <img src={previewUrl} alt="Preview" className="w-full h-32 object-cover rounded-md border" />
                <button type="button" onClick={removePhoto} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-gray-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Cliquez pour ajouter une photo</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            {formErrors.photo && <p className="text-sm text-red-600">{formErrors.photo}</p>}
          </div>

          {/* Audio */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Audio (optionnel)</label>
            {audioPreviewUrl ? (
              <div className="relative flex items-center space-x-2 border p-2 rounded-md">
                <audio controls src={audioPreviewUrl} className="flex-1" />
                <button type="button" onClick={removeAudio} className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`px-4 py-2 rounded-md text-white ${isRecording ? 'bg-red-500' : 'bg-blue-500'} hover:opacity-80`}
                >
                  {isRecording ? 'Arrêter' : 'Enregistrer'}
                </button>
                {isRecording && <span className="text-sm text-gray-500">Enregistrement...</span>}
              </div>
            )}
            {formErrors.audio && <p className="text-sm text-red-600">{formErrors.audio}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Annuler</Button>
            <Button type="submit" loading={loading} disabled={loading}>
              {loading ? (task ? 'Modification...' : 'Création...') : (task ? 'Modifier' : 'Créer')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
