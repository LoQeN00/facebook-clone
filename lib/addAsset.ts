export const addAsset = async (file: any) => {
  const form = new FormData();
  form.append('fileUpload', file);
  const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
    body: form,
  });
  const data = await response.json();
  return data;
};
