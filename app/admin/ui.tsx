'use client';

import { useState, type FormEvent } from 'react';

import type { Product, Enquiry } from '@/lib/db';

import { ODERA_IMAGES } from '@/lib/media';

import { formatMoney } from '@/lib/money';

type AdminProductForm =
  Partial<Omit<Product, 'available' | 'featured'>> & {
    available?: boolean;
    featured?: boolean;
  };

const blank: AdminProductForm = {
  name: '',
  slug: '',
  category: 'Men',
  description: '',
  price: 0,
  currency: 'NGN',
  image: ODERA_IMAGES[0],
  badge: '',
  available: true,
  featured: false,
  sort_order: 0,
};

const statuses = [
  'new',
  'contacted',
  'fitting',
  'confirmed',
  'completed',
  'cancelled',
] as const;

export function LoginForm() {
  const [email, setEmail] = useState('admin@odera.luxe');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (r.ok) {
      location.href = '/admin';
    } else {
      setError((await r.json()).error || 'Login failed');
    }
  }

  return (
    <main className="login">
      <form className="loginBox" onSubmit={submit}>
        <div className="logo">
          ODERA
          <small>LUXE</small>
        </div>

        <div
          className="eyebrow"
          style={{ marginTop: 30 }}
        >
          Private Studio
        </div>

        <h1
          className="serif"
          style={{ fontWeight: 500 }}
        >
          Admin login
        </h1>

        <div className="field">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="username"
          />
        </div>

        <div
          className="field"
          style={{ marginTop: 15 }}
        >
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button
          className="adminBtn"
          style={{
            marginTop: 20,
            width: '100%',
          }}
        >
          Enter Studio
        </button>
      </form>
    </main>
  );
}

export function AdminDashboard({
  initialProducts,
  initialEnquiries,
}: {
  initialProducts: Product[];
  initialEnquiries: Enquiry[];
}) {
  const [tab, setTab] = useState<'products' | 'enquiries'>('products');

  const [products, setProducts] =
    useState<Product[]>(initialProducts);

  const [enquiries, setEnquiries] =
    useState<Enquiry[]>(initialEnquiries);

  const [editing, setEditing] =
    useState<AdminProductForm | null>(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const start = (p?: Product) => {
    setMessage('');

    if (p) {
      setEditing({
        ...p,
        available: Boolean(p.available),
        featured: Boolean(p.featured),
      });
    } else {
      setEditing({
        ...blank,
      });
    }
  };

  async function save() {
    if (!editing?.name) return;

    setSaving(true);
    setMessage('');

    const isNew = !editing.id;

    const r = await fetch(
      isNew
        ? '/api/admin/products'
        : `/api/admin/products/${editing.id}`,
      {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editing),
      }
    );

    if (r.ok) {
      location.reload();
    } else {
      const data = await r.json();
      setMessage(data.error || 'Could not save');
      setSaving(false);
    }
  }

  async function del(id: number) {
    if (!confirm('Delete this product?')) return;

    const r = await fetch(
      `/api/admin/products/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (r.ok) {
      setProducts((p) =>
        p.filter((x) => x.id !== id)
      );
    }
  }

  async function status(
    id: string,
    status: string
  ) {
    const r = await fetch(
      `/api/admin/enquiries/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }
    );

    if (r.ok) {
      setEnquiries((items) =>
        items.map((x) =>
          x.id === id
            ? {
                ...x,
                status:
                  status as Enquiry['status'],
              }
            : x
        )
      );
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', {
      method: 'POST',
    });

    location.href = '/admin/login';
  }

  return (
    <main className="adminShell">
      <header className="adminNav">
        <div className="logo">
          ODERA
          <small>LUXE</small>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <button
            className="adminBtn"
            onClick={() => {
              setTab('products');
              start();
            }}
          >
            + Add Product
          </button>

          <button
            className="adminBtn secondary"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="adminMain">
        <div className="adminTabs">
          <button
            className={
              tab === 'products'
                ? 'active'
                : ''
            }
            onClick={() =>
              setTab('products')
            }
          >
            Products <b>{products.length}</b>
          </button>

          <button
            className={
              tab === 'enquiries'
                ? 'active'
                : ''
            }
            onClick={() =>
              setTab('enquiries')
            }
          >
            WhatsApp Enquiries{' '}
            <b>
              {
                enquiries.filter(
                  (e) => e.status === 'new'
                ).length
              }
            </b>
          </button>
        </div>

        {tab === 'products' && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'end',
                marginBottom: 20,
              }}
            >
              <div>
                <div className="eyebrow">
                  Content Studio
                </div>

                <h1 className="serif adminTitle">
                  Products
                </h1>

                <p
                  style={{
                    color: '#aaa',
                    fontSize: 13,
                  }}
                >
                  Manage price, description,
                  image, availability and
                  featured placement.
                </p>
              </div>
            </div>

            {editing && (
              <section
                className="adminForm"
                style={{ marginBottom: 25 }}
              >
                <div className="eyebrow">
                  {editing.id
                    ? 'Edit product'
                    : 'New product'}
                </div>

                <div
                  className="formGrid"
                  style={{ marginTop: 20 }}
                >
                  {[
                    ['name', 'Name'],
                    ['slug', 'Slug'],
                    ['category', 'Category'],
                    ['price', 'Price'],
                    ['currency', 'Currency'],
                    ['badge', 'Badge'],
                    ['sort_order', 'Sort order'],
                  ].map(([key, label]) => (
                    <div
                      className="field"
                      key={key}
                    >
                      <label>{label}</label>

                      <input
                        value={String(
                          (
                            editing as Record<
                              string,
                              unknown
                            >
                          )[key] ?? ''
                        )}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            [key]:
                              key === 'price' ||
                              key === 'sort_order'
                                ? Number(
                                    e.target.value
                                  )
                                : e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}

                  <div className="field full">
                    <label>Image</label>

                    <select
                      value={
                        editing.image ||
                        ODERA_IMAGES[0]
                      }
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          image:
                            e.target.value,
                        })
                      }
                    >
                      {ODERA_IMAGES.map(
                        (image) => (
                          <option
                            value={image}
                            key={image}
                          >
                            {image
                              .split('/')
                              .pop()
                              ?.replaceAll(
                                '%20',
                                ' '
                              )}
                          </option>
                        )
                      )}
                    </select>

                    <div
                      className="adminPreview"
                      style={{
                        backgroundImage: `url(${editing.image || ODERA_IMAGES[0]})`,
                      }}
                    />
                  </div>

                  <div className="field full">
                    <label>
                      Description
                    </label>

                    <textarea
                      value={
                        editing.description ||
                        ''
                      }
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          description:
                            e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="check">
                    <input
                      type="checkbox"
                      checked={
                        !!editing.available
                      }
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          available:
                            e.target.checked,
                        })
                      }
                    />

                    Available for WhatsApp
                    store
                  </div>

                  <div className="check">
                    <input
                      type="checkbox"
                      checked={
                        !!editing.featured
                      }
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          featured:
                            e.target.checked,
                        })
                      }
                    />

                    Featured on homepage
                  </div>
                </div>

                {message && (
                  <div className="error">
                    {message}
                  </div>
                )}

                <div className="adminActions">
                  <button
                    className="adminBtn"
                    onClick={save}
                    disabled={saving}
                  >
                    {saving
                      ? 'Saving…'
                      : 'Save product'}
                  </button>

                  <button
                    className="adminBtn secondary"
                    onClick={() =>
                      setEditing(null)
                    }
                  >
                    Cancel
                  </button>
                </div>
              </section>
            )}

            <section className="adminTable">
              <div className="tableWrap">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Featured</th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <strong>
                            {p.name}
                          </strong>

                          <br />

                          <span
                            style={{
                              color: '#777',
                            }}
                          >
                            {p.slug}
                          </span>
                        </td>

                        <td>{p.category}</td>

                        <td>
                          {formatMoney(
                            p.price,
                            p.currency
                          )}
                        </td>

                        <td>
                          {p.available
                            ? 'Available'
                            : 'Hidden'}
                        </td>

                        <td>
                          {p.featured
                            ? 'Yes'
                            : 'No'}
                        </td>

                        <td
                          style={{
                            whiteSpace:
                              'nowrap',
                          }}
                        >
                          <button
                            className="adminBtn secondary"
                            onClick={() =>
                              start(p)
                            }
                          >
                            Edit
                          </button>{' '}
                          <button
                            className="adminBtn secondary"
                            onClick={() =>
                              del(p.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {tab === 'enquiries' && (
          <section className="adminTable">
            <div className="enquiryIntro">
              <div>
                <div className="eyebrow">
                  WhatsApp pipeline
                </div>

                <h1 className="serif adminTitle">
                  Enquiries
                </h1>

                <p
                  style={{
                    color: '#aaa',
                    fontSize: 13,
                  }}
                >
                  Every WhatsApp bag now gets
                  a reference before the customer
                  leaves the site.
                </p>
              </div>
            </div>

            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {enquiries.map((e) => {
                    const items =
                      JSON.parse(
                        e.items_json || '[]'
                      ) as Array<{
                        name: string;
                        price: number;
                        currency: string;
                      }>;

                    const totals =
                      JSON.parse(
                        e.total_json || '{}'
                      ) as Record<
                        string,
                        number
                      >;

                    return (
                      <tr key={e.id}>
                        <td>
                          <strong>
                            {e.id}
                          </strong>

                          <br />

                          <span
                            style={{
                              color: '#777',
                            }}
                          >
                            {new Date(
                              e.created_at + 'Z'
                            ).toLocaleString()}
                          </span>
                        </td>

                        <td>
                          {e.customer_name ||
                            'Not provided'}

                          <br />

                          <span
                            style={{
                              color: '#777',
                            }}
                          >
                            {e.customer_phone ||
                              'No phone'}
                          </span>
                        </td>

                        <td>
                          {items.length} piece
                          {items.length === 1
                            ? ''
                            : 's'}

                          <br />

                          <span
                            style={{
                              color: '#777',
                            }}
                          >
                            {items
                              .slice(0, 2)
                              .map(
                                (i) => i.name
                              )
                              .join(', ')}
                            {items.length > 2
                              ? '…'
                              : ''}
                          </span>
                        </td>

                        <td>
                          {Object.entries(
                            totals
                          ).map(
                            ([
                              currency,
                              total,
                            ]) => (
                              <div
                                key={currency}
                              >
                                {formatMoney(
                                  total,
                                  currency
                                )}
                              </div>
                            )
                          )}
                        </td>

                        <td>
                          <select
                            value={e.status}
                            onChange={(ev) =>
                              status(
                                e.id,
                                ev.target.value
                              )
                            }
                          >
                            {statuses.map(
                              (s) => (
                                <option
                                  key={s}
                                  value={s}
                                >
                                  {s}
                                </option>
                              )
                            )}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}