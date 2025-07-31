import { useState } from 'react';
import { Modal, TextInput, Button, Group, Stack, Checkbox } from '@mantine/core';
import { FiLink, FiExternalLink } from 'react-icons/fi';

interface LinkModalProps {
  opened: boolean;
  onClose: () => void;
  onInsert: (url: string, text?: string) => void;
  selectedText?: string;
}

export default function LinkModal({ opened, onClose, onInsert, selectedText }: LinkModalProps) {
  const [url, setUrl] = useState('');
  const [text, setText] = useState(selectedText || '');
  const [openInNewTab, setOpenInNewTab] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      const finalUrl = openInNewTab && !url.includes('target=') 
        ? url 
        : url;
      onInsert(finalUrl, text || url);
      handleClose();
    }
  };

  const handleClose = () => {
    setUrl('');
    setText(selectedText || '');
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Insert Link"
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
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        },
        body: {
          padding: '1.5rem',
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="URL"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            autoFocus
            leftSection={<FiLink size={16} />}
            styles={{
              input: {
                backgroundColor: '#0d1117',
                borderColor: '#30363d',
                '&:focus': {
                  borderColor: '#58a6ff',
                },
              },
              label: {
                marginBottom: '0.25rem',
              },
            }}
          />

          <TextInput
            label={`Link Text ${!selectedText ? '(optional)' : ''}`}
            placeholder={selectedText || "Link text"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            styles={{
              input: {
                backgroundColor: '#0d1117',
                borderColor: '#30363d',
                '&:focus': {
                  borderColor: '#58a6ff',
                },
              },
              label: {
                marginBottom: '0.25rem',
              },
            }}
          />

          <Checkbox
            label={
              <Group gap={4}>
                <span>Open in new tab</span>
                <FiExternalLink size={14} />
              </Group>
            }
            checked={openInNewTab}
            onChange={(e) => setOpenInNewTab(e.currentTarget.checked)}
            styles={{
              input: {
                backgroundColor: '#0d1117',
                borderColor: '#30363d',
                '&:checked': {
                  backgroundColor: '#58a6ff',
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
              styles={{
                root: {
                  backgroundColor: '#58a6ff',
                  '&:hover': {
                    backgroundColor: '#1f6feb',
                  },
                },
              }}
            >
              Insert Link
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}