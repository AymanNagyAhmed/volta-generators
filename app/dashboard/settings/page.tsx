"use client";

import { useEffect, useState } from "react";
import { Card, Spinner, Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { title } from "@/components/primitives";
import { getAllSiteSections } from "@/lib/services/site-setions.service";
import { settingsService } from "@/lib/services/settings.service";
import { Pencil, Trash2 } from "lucide-react";
import type { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

export default function SettingsPage() {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<SiteSetting | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await getAllSiteSections();
        if ('data' in response) {
          console.log('response', response.data);
          setSections(response.data);
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
    setEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedSetting) return;

    try {
      const response = await settingsService.updateSetting(selectedSetting.id, {
        value: editValue
      });

      if (response.success) {
        // Update the local state
        setSections(sections.map(section => ({
          ...section,
          settings: section.settings.map(setting => 
            setting.id === selectedSetting.id 
              ? { ...setting, value: editValue }
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
        // Update the local state
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
                          <button
                            className="p-2 hover:bg-gray-100 rounded-full text-red-600"
                            onClick={() => handleDeleteSetting(setting)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      {setting.value.startsWith('/') ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${setting.value}`}
                          alt={setting.key}
                          className="h-20 w-auto object-contain"
                        />
                      ) : (
                        <span className="text-sm break-words">
                          {setting.key === 'menu_items' 
                            ? JSON.parse(setting.value).join(', ')
                            : setting.value}
                        </span>
                      )}
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
        >
          <ModalContent>
            <ModalHeader>
              <h3 className="text-lg font-semibold">
                Edit {selectedSetting?.key.replace(/_/g, ' ')}
              </h3>
            </ModalHeader>
            <ModalBody>
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Enter new value"
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