import { renderHook, act } from '@testing-library/react';
import { type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useUpload } from '../useUpload';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return { ...actual, useDispatch: () => mockDispatch };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

const wrapper = ({ children }: { children: ReactNode }) => <MemoryRouter>{children}</MemoryRouter>;

const makeFile = (type: string, sizeBytes: number): File => {
  const content = new Uint8Array(sizeBytes);
  return new File([content], 'test.jpg', { type });
};

const makeProps = (overrides = {}) => ({
  uploadFunc: vi.fn().mockResolvedValue({ url: 'https://example.com/img.jpg', public_id: 'abc' }),
  removeFunc: vi.fn().mockResolvedValue(undefined),
  url: undefined,
  public_id: undefined,
  graphQLMutation: vi.fn().mockResolvedValue({}),
  refetchFunc: vi.fn().mockResolvedValue({}),
  ...overrides,
});

describe('useUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('onSubmit — validation', () => {
    it('dispatches an error when the file type is not allowed', async () => {
      const props = makeProps();
      const { result } = renderHook(() => useUpload(props), { wrapper });

      await act(async () => {
        await result.current.onSubmit({ imageFile: makeFile('image/bmp', 100) });
      });

      expect(props.uploadFunc).not.toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({ text: 'Invalid file type.', type: 'error' }),
        })
      );
    });

    it('dispatches an error when the file exceeds 2MB', async () => {
      const props = makeProps();
      const { result } = renderHook(() => useUpload(props), { wrapper });
      const oversizedFile = makeFile('image/jpeg', 2 * 1024 * 1024 + 1);

      await act(async () => {
        await result.current.onSubmit({ imageFile: oversizedFile });
      });

      expect(props.uploadFunc).not.toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({ text: 'File must be under 2MB.', type: 'error' }),
        })
      );
    });

    it('does nothing when no file is provided and there is no existing image to remove', async () => {
      const props = makeProps();
      const { result } = renderHook(() => useUpload(props), { wrapper });

      await act(async () => {
        await result.current.onSubmit({ imageFile: null });
      });

      expect(props.uploadFunc).not.toHaveBeenCalled();
      expect(props.graphQLMutation).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe('onSubmit — successful upload', () => {
    it('calls uploadFunc, graphQLMutation and refetchFunc in sequence', async () => {
      const props = makeProps();
      const { result } = renderHook(() => useUpload(props), { wrapper });
      const validFile = makeFile('image/jpeg', 100);

      await act(async () => {
        await result.current.onSubmit({ imageFile: validFile });
      });

      expect(props.uploadFunc).toHaveBeenCalledOnce();
      expect(props.graphQLMutation).toHaveBeenCalledOnce();
      expect(props.refetchFunc).toHaveBeenCalledOnce();
    });

    it('dispatches a success alert and navigates back after upload', async () => {
      const props = makeProps();
      const { result } = renderHook(() => useUpload(props), { wrapper });

      await act(async () => {
        await result.current.onSubmit({ imageFile: makeFile('image/png', 100) });
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({ text: 'Image updated!', type: 'success' }),
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('sets loading to false after a successful upload', async () => {
      const props = makeProps();
      const { result } = renderHook(() => useUpload(props), { wrapper });

      await act(async () => {
        await result.current.onSubmit({ imageFile: makeFile('image/webp', 100) });
      });

      expect(result.current.loading).toBe(false);
    });
  });

  describe('onSubmit — upload failure', () => {
    it('dispatches an error alert and sets loading to false when uploadFunc throws', async () => {
      const props = makeProps({
        uploadFunc: vi.fn().mockRejectedValue(new Error('Upload failed')),
      });
      const { result } = renderHook(() => useUpload(props), { wrapper });

      await act(async () => {
        await result.current.onSubmit({ imageFile: makeFile('image/jpeg', 100) });
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({ text: 'Upload failed', type: 'error' }),
        })
      );
      expect(result.current.loading).toBe(false);
    });
  });

  describe('removeImage', () => {
    it('does nothing when no public_id is provided', async () => {
      const props = makeProps({ public_id: undefined });
      const { result } = renderHook(() => useUpload(props), { wrapper });

      await act(async () => {
        await result.current.removeImage();
      });

      expect(props.removeFunc).not.toHaveBeenCalled();
    });

    it('calls removeFunc, graphQLMutation and refetchFunc when public_id is set', async () => {
      const props = makeProps({ public_id: 'existing-public-id' });
      const { result } = renderHook(() => useUpload(props), { wrapper });

      await act(async () => {
        await result.current.removeImage();
      });

      expect(props.removeFunc).toHaveBeenCalledWith('existing-public-id');
      expect(props.graphQLMutation).toHaveBeenCalledWith({
        variables: { public_id: '0', url: 'default' },
      });
      expect(props.refetchFunc).toHaveBeenCalledOnce();
    });

    it('dispatches a success alert and navigates back after removal', async () => {
      const props = makeProps({ public_id: 'existing-public-id' });
      const { result } = renderHook(() => useUpload(props), { wrapper });

      await act(async () => {
        await result.current.removeImage();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            text: 'Image removed successfully!',
            type: 'success',
          }),
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
