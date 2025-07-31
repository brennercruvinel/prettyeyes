import { useState } from 'react';
import { Modal, TextInput, Button, Group, Stack, Tabs, FileInput, NumberInput } from '@mantine/core';
import { FiImage, FiLink, FiUpload } from 'react-icons/fi';

interface ImageModalProps {
  opened: boolean;
  onClose: () => void;
  onInsert: (src: string, alt?: string, width?: number) => void;
}

export default function ImageModal({ opened, onClose, onInsert }: ImageModalProps) {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onInsert(e.target.result as string, alt, width);
          handleClose();
        }
      };
      reader.readAsDataURL(file);
    } else if (url) {
      onInsert(url, alt, width);
      handleClose();
    }
  };

  const handleClose = () => {
    setUrl('');
    setAlt('');
    setWidth(undefined);
    setFile(null);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Insert Image"
      centered
      size="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        title: {
          fontSize: '1.125rem',
          fontWeight: 600,
        },
        body: {
          padding: '1.5rem',
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="url" styles={{
          tab: {
            backgroundColor: 'transparent',
            color: '#8b949e',
            borderColor: '#30363d',
            '&[data-active]': {
              backgroundColor: '#161b22',
              color: '#c9d1d9',
              borderColor: '#58a6ff',
            },
          },
        }}>
          <Tabs.List>
            <Tabs.Tab value="url" leftSection={<FiLink size={16} />}>
              URL
            </Tabs.Tab>
            <Tabs.Tab value="upload" leftSection={<FiUpload size={16} />}>
              Upload
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="url" pt="md">
            <Stack gap="md">
              <TextInput
                label="Image URL"
                placeholder="https://example.com/image.png"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required={!file}
                leftSection={<FiImage size={16} />}
                styles={{
                  input: {
                    backgroundColor: '#0d1117',
                    borderColor: '#30363d',
                    '&:focus': {
                      borderColor: '#58a6ff',
                    },
                  },
                }}
              />
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="upload" pt="md">
            <Stack gap="md">
              <FileInput
                label="Choose Image"
                placeholder="Click to select image"
                value={file}
                onChange={setFile}
                accept="image/*"
                required={!url}
                leftSection={<FiUpload size={16} />}
                styles={{
                  input: {
                    backgroundColor: '#0d1117',
                    borderColor: '#30363d',
                    '&:focus': {
                      borderColor: '#58a6ff',
                    },
                  },
                }}
              />
            </Stack>
          </Tabs.Panel>
        </Tabs>

        <Stack gap="md" mt="md">
          <TextInput
            label="Alt Text (recommended for accessibility)"
            placeholder="Describe the image"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            styles={{
              input: {
                backgroundColor: '#0d1117',
                borderColor: '#30363d',
                '&:focus': {
                  borderColor: '#58a6ff',
                },
              },
            }}
          />

          <NumberInput
            label="Width (optional)"
            placeholder="Auto"
            value={width}
            onChange={(value) => setWidth(typeof value === 'number' ? value : undefined)}
            min={50}
            max={2000}
            step={50}
            styles={{
              input: {
                backgroundColor: '#0d1117',
                borderColor: '#30363d',
                '&:focus': {
                  borderColor: '#58a6ff',
                },
              },
            }}
          />

          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={handleClose}
              styles={{
                root: {
                  backgroundColor: '#0d1117',
                  borderColor: '#30363d',
                  color: '#c9d1d9',
                  '&:hover': {
                    backgroundColor: '#161b22',
                  },
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!url && !file}
              styles={{
                root: {
                  backgroundColor: '#58a6ff',
                  '&:hover': {
                    backgroundColor: '#1f6feb',
                  },
                  '&:disabled': {
                    backgroundColor: '#30363d',
                    color: '#6e7681',
                  },
                },
              }}
            >
              Insert Image
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}