"use client";

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Plus, X } from "lucide-react";
import { SliderImage, EditableSliderImage, FAQItem, EditableFAQItem, ReasonItem, EditableReasonItem, ContactInfo } from "../types";

interface SettingEditorProps {
  type: "text" | "slider" | "faq" | "reason" | "contact";
  value: string;
  onChange: (value: string) => void;
  editableImages: EditableSliderImage[];
  setEditableImages: (images: EditableSliderImage[]) => void;
  editableFAQs: EditableFAQItem[];
  setEditableFAQs: (faqs: EditableFAQItem[]) => void;
  editableReasons: EditableReasonItem[];
  setEditableReasons: React.Dispatch<React.SetStateAction<EditableReasonItem[]>>;
  editableContactInfo: ContactInfo | null;
  setEditableContactInfo: (info: ContactInfo | null) => void;
  nextImageId: number;
  setNextImageId: (id: number) => void;
  nextFAQId: number;
  setNextFAQId: (id: number) => void;
  nextReasonId: number;
  setNextReasonId: (id: number) => void;
}

export function SettingEditor({
  type,
  value,
  onChange,
  editableImages,
  setEditableImages,
  editableFAQs,
  setEditableFAQs,
  editableReasons,
  setEditableReasons,
  editableContactInfo,
  setEditableContactInfo,
  nextImageId,
  setNextImageId,
  nextFAQId,
  setNextFAQId,
  nextReasonId,
  setNextReasonId,
}: SettingEditorProps) {
  // Helper functions
  const addNewImage = () => {
    setEditableImages([
      ...editableImages,
      {
        id: nextImageId,
        description: `Slide ${editableImages.length + 1}`,
        image: "",
        isNew: true
      }
    ]);
    setNextImageId(nextImageId + 1);
  };

  const updateImage = (id: number, field: keyof SliderImage, value: string) => {
    setEditableImages(editableImages.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  const removeImage = (id: number) => {
    setEditableImages(editableImages.filter(img => img.id !== id));
  };

  const addNewFAQ = () => {
    setEditableFAQs([
      ...editableFAQs,
      {
        id: nextFAQId,
        question: "",
        answer: "",
        isNew: true
      }
    ]);
    setNextFAQId(nextFAQId + 1);
  };

  const updateFAQ = (id: number, field: keyof FAQItem, value: string) => {
    setEditableFAQs(editableFAQs.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    ));
  };

  const removeFAQ = (id: number) => {
    setEditableFAQs(editableFAQs.filter(faq => faq.id !== id));
  };

  const addNewReason = () => {
    const maxReasonId = Math.max(...editableReasons.map(r => r.reason_id), 0);
    setEditableReasons([
      ...editableReasons,
      {
        id: nextReasonId,
        reason_id: maxReasonId + 1,
        title: "",
        description: "",
        isNew: true
      }
    ]);
    setNextReasonId(nextReasonId + 1);
  };

  const updateReason = (id: number, field: keyof ReasonItem, value: string | number) => {
    setEditableReasons(editableReasons.map(reason => 
      reason.id === id ? { ...reason, [field]: value } : reason
    ));
  };

  const removeReason = (id: number) => {
    setEditableReasons((prevReasons: EditableReasonItem[]) => {
      const newReasons = prevReasons.filter(reason => reason.id !== id);
      return newReasons.map((reason, index) => ({
        ...reason,
        reason_id: index + 1
      }));
    });
  };

  const updateContactInfo = (field: keyof ContactInfo, value: string) => {
    if (editableContactInfo) {
      setEditableContactInfo({
        ...editableContactInfo,
        [field]: value
      });
    }
  };

  // Render different editors based on type
  if (type === "slider" && editableImages.length > 0) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {editableImages.map((image) => (
            <div key={image.id} className="border rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      label="Image URL"
                      value={image.image}
                      onChange={(e) => updateImage(image.id, 'image', e.target.value)}
                      placeholder="/path/to/image.jpg"
                    />
                  </div>
                  <button
                    onClick={() => removeImage(image.id)}
                    className="mt-5 p-2 rounded-full bg-danger-50 text-danger hover:bg-danger hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div>
                  <Input
                    label="Description"
                    value={image.description}
                    onChange={(e) => updateImage(image.id, 'description', e.target.value)}
                    placeholder="Slide description"
                  />
                </div>

                {image.image && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${image.image}`}
                    alt={image.description}
                    className="h-32 w-full object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button
          color="primary"
          variant="flat"
          startContent={<Plus size={16} />}
          onClick={addNewImage}
          className="w-full"
        >
          Add New Image
        </Button>
      </div>
    );
  }

  if (type === "faq" && editableFAQs.length > 0) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {editableFAQs.map((faq) => (
            <div key={faq.id} className="border rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      label="Question"
                      value={faq.question}
                      onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                      placeholder="Enter question"
                    />
                  </div>
                  <button
                    onClick={() => removeFAQ(faq.id)}
                    className="mt-5 p-2 rounded-full bg-danger-50 text-danger hover:bg-danger hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div>
                  <Input
                    label="Answer"
                    value={faq.answer}
                    onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                    placeholder="Enter answer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          color="primary"
          variant="flat"
          startContent={<Plus size={16} />}
          onClick={addNewFAQ}
          className="w-full"
        >
          Add New FAQ
        </Button>
      </div>
    );
  }

  if (type === "reason" && editableReasons.length > 0) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {editableReasons.map((reason) => (
            <div key={reason.id} className="border rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-lg">
                    <span className="text-sm font-medium text-primary">
                      #{reason.reason_id}
                    </span>
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Title"
                      value={reason.title}
                      onChange={(e) => updateReason(reason.id, 'title', e.target.value)}
                      placeholder="Enter title"
                    />
                  </div>
                  <button
                    onClick={() => removeReason(reason.id)}
                    className="mt-5 p-2 rounded-full bg-danger-50 text-danger hover:bg-danger hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div>
                  <Input
                    label="Description"
                    value={reason.description}
                    onChange={(e) => updateReason(reason.id, 'description', e.target.value)}
                    placeholder="Enter description"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    label="Order"
                    value={reason.reason_id.toString()}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value) || 1;
                      updateReason(reason.id, 'reason_id', newValue);
                      const otherReasons = editableReasons.filter(r => r.id !== reason.id);
                      if (otherReasons.some(r => r.reason_id === newValue)) {
                        setEditableReasons(prev => 
                          prev.map(r => {
                            if (r.id === reason.id) return { ...r, reason_id: newValue };
                            if (r.reason_id >= newValue) return { ...r, reason_id: r.reason_id + 1 };
                            return r;
                          })
                        );
                      }
                    }}
                    className="w-32"
                  />
                  <span className="text-xs text-gray-500 mt-6">
                    Change order
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          color="primary"
          variant="flat"
          startContent={<Plus size={16} />}
          onClick={addNewReason}
          className="w-full"
        >
          Add New Reason
        </Button>
      </div>
    );
  }

  if (type === "contact" && editableContactInfo) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(editableContactInfo).map(([key, value]) => (
            <Input
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
              value={String(value)}
              onChange={(e) => updateContactInfo(key as keyof ContactInfo, e.target.value)}
              placeholder={`Enter ${key.replace(/_/g, ' ')}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default text editor
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter new value"
    />
  );
} 