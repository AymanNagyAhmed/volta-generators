"use client";

import { useEffect, useState } from "react";
import { Card, Spinner, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { title } from "@/components/primitives";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { settingsService } from "@/lib/services/settings.service";
import { Pencil, Trash2 } from "lucide-react";
import type { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";
import { SettingDisplay } from "../../../components/dashboard/SettingDisplay";
import { SettingEditor } from "../../../components/dashboard/SettingEditor";
import { EditableSliderImage, EditableFAQItem, EditableReasonItem, ContactInfo } from "./types";

export default function SettingsPage() {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<SiteSetting | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editableImages, setEditableImages] = useState<EditableSliderImage[]>([]);
  const [nextImageId, setNextImageId] = useState(0);
  const [editableFAQs, setEditableFAQs] = useState<EditableFAQItem[]>([]);
  const [editableReasons, setEditableReasons] = useState<EditableReasonItem[]>([]);
  const [nextReasonId, setNextReasonId] = useState(0);
  const [nextFAQId, setNextFAQId] = useState(0);
  const [editableContactInfo, setEditableContactInfo] = useState<ContactInfo | null>(null);
  const [editorType, setEditorType] = useState<"text" | "slider" | "faq" | "reason" | "contact">("text");

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await getAllSiteSections();
        if ('data' in response) {
          // Filter out the background section from the UI display
          // but keep it in the API for background image functionality
          const filteredSections = response.data.filter(
            section => section.title !== "background"
          );
          setSections(filteredSections);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch sections');
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const handleEditSetting = async (setting: SiteSetting) => {
    setSelectedSetting(setting);
    setEditValue(setting.value);
    
    // Reset all editable states
    setEditableImages([]);
    setEditableFAQs([]);
    setEditableReasons([]);
    setEditableContactInfo(null);
    setNextImageId(0);
    setNextFAQId(0);
    setNextReasonId(0);
    
    try {
      const parsedValue = JSON.parse(setting.value);
      if (Array.isArray(parsedValue)) {
        if (parsedValue[0]?.image) {
          const images = parsedValue.map((item, index) => ({
            ...item,
            id: index
          }));
          setEditableImages(images);
          setNextImageId(Math.max(...images.map(img => img.id)) + 1);
          setEditorType("slider");
        } else if (parsedValue[0]?.question) {
          const faqs = parsedValue.map((item, index) => ({
            ...item,
            id: index
          }));
          setEditableFAQs(faqs);
          setNextFAQId(Math.max(...faqs.map(faq => faq.id)) + 1);
          setEditorType("faq");
        } else if (parsedValue[0]?.reason_id) {
          const reasons = parsedValue.map((item, index) => ({
            ...item,
            id: index
          }));
          setEditableReasons(reasons);
          setNextReasonId(Math.max(...reasons.map(reason => reason.id)) + 1);
          setEditorType("reason");
        } else {
          setEditorType("text");
        }
      } else if (parsedValue && typeof parsedValue === 'object' && parsedValue.email) {
        setEditableContactInfo(parsedValue);
        setEditorType("contact");
      } else {
        setEditorType("text");
      }
    } catch {
      setEditorType("text");
    }
    
    setEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedSetting) return;

    try {
      let valueToSave = editValue;
      
      if (editorType === "slider" && editableImages.length > 0) {
        valueToSave = JSON.stringify(
          editableImages.map(({ id, isNew, ...rest }) => rest)
        );
      } else if (editorType === "faq" && editableFAQs.length > 0) {
        valueToSave = JSON.stringify(
          editableFAQs.map(({ id, isNew, ...rest }) => rest)
        );
      } else if (editorType === "reason" && editableReasons.length > 0) {
        valueToSave = JSON.stringify(
          editableReasons.map(({ id, isNew, ...rest }) => rest)
        );
      } else if (editorType === "contact" && editableContactInfo) {
        valueToSave = JSON.stringify(editableContactInfo);
      }

      const response = await settingsService.updateSetting(selectedSetting.id, {
        value: valueToSave
      });

      if (response.success) {
        setSections(sections.map(section => ({
          ...section,
          settings: section.settings.map(setting => 
            setting.id === selectedSetting.id 
              ? { ...setting, value: valueToSave }
              : setting
          )
        })));
        setEditModal(false);
      } else {
        setError("Failed to update setting");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update setting');
    }
  };

  const handleDeleteSetting = async (setting: SiteSetting) => {
    if (!confirm("Are you sure you want to delete this setting?")) return;

    try {
      const response = await settingsService.deleteSetting(setting.id);

      if (response.success) {
        setSections(sections.map(section => ({
          ...section,
          settings: section.settings.filter(s => s.id !== setting.id)
        })));
      } else {
        setError("Failed to delete setting");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete setting');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-danger-50">
        <p className="text-danger">Error: {error}</p>
      </Card>
    );
  }

  return (
    <div className="gap-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={title({ className: "text-gray-900" })}>
          Settings
        </h1>
      </div>

      {/* Sections Grid */}
      <div className="grid gap-6">
        {sections.map((section) => (
          <Card key={section.id} className="p-6 bg-white">
            <div className="flex flex-col gap-4">
              {/* Section Header */}
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="text-gray-900">
                  {section.description}
                </p>
              </div>

              {/* Settings List */}
              <div className="border-t pt-4 text-gray-900">
                <div className="grid gap-4">
                  {section.settings?.map((setting) => (
                    <div key={setting.id} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm capitalize">
                          {setting.key.replace(/_/g, ' ')}
                        </span>
                        <div className="flex gap-2">
                          <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={() => handleEditSetting(setting)}
                          >
                            <Pencil size={16} />
                          </button>
                          {/* <button className="p-2 hover:bg-gray-100 rounded-full text-red-600" onClick={() => handleDeleteSetting(setting)} >
                            <Trash2 size={16} />
                          </button> */}
                        </div>
                      </div>
                      <SettingDisplay setting={setting} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {sections.length === 0 && (
          <Card className="p-6 text-gray-900">
            <p className="text-center">
              No sections found
            </p>
          </Card>
        )}

        {/* Edit Modal */}
        <Modal 
          isOpen={editModal} 
          onOpenChange={(open) => setEditModal(open)}
          size="3xl"
          className="h-[90vh]"
        >
          <ModalContent className="h-full">
            <ModalHeader>
              <h3 className="text-lg font-semibold">
                Edit {selectedSetting?.key.replace(/_/g, ' ')}
              </h3>
            </ModalHeader>
            <ModalBody className="overflow-y-auto">
              <SettingEditor
                type={editorType}
                value={editValue}
                onChange={setEditValue}
                editableImages={editableImages}
                setEditableImages={setEditableImages}
                editableFAQs={editableFAQs}
                setEditableFAQs={setEditableFAQs}
                editableReasons={editableReasons}
                setEditableReasons={setEditableReasons}
                editableContactInfo={editableContactInfo}
                setEditableContactInfo={setEditableContactInfo}
                nextImageId={nextImageId}
                setNextImageId={setNextImageId}
                nextFAQId={nextFAQId}
                setNextFAQId={setNextFAQId}
                nextReasonId={nextReasonId}
                setNextReasonId={setNextReasonId}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => setEditModal(false)}
              >
                Cancel
              </Button>
              <Button color="primary" onPress={handleSaveEdit}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
} 