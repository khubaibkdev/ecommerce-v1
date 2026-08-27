import { getSiteSettings } from '@/lib/settings'
import { listMedia } from '@/lib/media'
import { PageHeader, Card, Field, Input, Textarea, Checkbox, SubmitButton } from '@/components/admin/ui'
import ImagePicker from '@/components/admin/ImagePicker'
import { updateSettings } from './actions'

const SectionTitle = ({ id, children }: { id?: string; children: React.ReactNode }) => (
    <h2 id={id} className="mb-4 scroll-mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {children}
    </h2>
)

const AdminSettingsPage = async () => {
    const [settings, media] = await Promise.all([getSiteSettings(), listMedia()])

    return (
        <div>
            <PageHeader title="Site Settings" description="Branding, footer, contact details, and storefront behavior." />

            <form action={updateSettings} className="flex flex-col gap-10">
                <section>
                    <SectionTitle>Branding</SectionTitle>
                    <Card className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Site Name" htmlFor="siteName">
                            <Input id="siteName" name="siteName" defaultValue={settings.siteName} />
                        </Field>
                        <Field label="Tagline" htmlFor="tagline">
                            <Input id="tagline" name="tagline" defaultValue={settings.tagline} />
                        </Field>
                        <ImagePicker name="logoLight" label="Logo (for light header)" defaultValue={settings.logoLight} media={media} />
                        <ImagePicker name="logoDark" label="Logo (for dark backgrounds / footer)" defaultValue={settings.logoDark} media={media} />
                        <ImagePicker name="favicon" label="Favicon" defaultValue={settings.favicon} media={media} />
                    </Card>
                </section>

                <section>
                    <SectionTitle>Contact & Footer</SectionTitle>
                    <Card className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Phone" htmlFor="contactPhone">
                            <Input id="contactPhone" name="contactPhone" defaultValue={settings.contactPhone} />
                        </Field>
                        <Field label="Email" htmlFor="contactEmail">
                            <Input id="contactEmail" name="contactEmail" defaultValue={settings.contactEmail} />
                        </Field>
                        <Field label="Address" htmlFor="contactAddress">
                            <Textarea id="contactAddress" name="contactAddress" rows={2} defaultValue={settings.contactAddress} />
                        </Field>
                        <Field label="Footer Description" htmlFor="footerDescription">
                            <Textarea id="footerDescription" name="footerDescription" rows={2} defaultValue={settings.footerDescription} />
                        </Field>
                        <Field label="Copyright Text" htmlFor="copyrightText" hint="Shown after the year, e.g. 2026 [this text]">
                            <Input id="copyrightText" name="copyrightText" defaultValue={settings.copyrightText} />
                        </Field>
                    </Card>
                </section>

                <section>
                    <SectionTitle>Social Links</SectionTitle>
                    <Card className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Field label="Facebook URL" htmlFor="facebookUrl">
                            <Input id="facebookUrl" name="facebookUrl" defaultValue={settings.facebookUrl} />
                        </Field>
                        <Field label="Twitter / X URL" htmlFor="twitterUrl">
                            <Input id="twitterUrl" name="twitterUrl" defaultValue={settings.twitterUrl} />
                        </Field>
                        <Field label="Instagram URL" htmlFor="instagramUrl">
                            <Input id="instagramUrl" name="instagramUrl" defaultValue={settings.instagramUrl} />
                        </Field>
                    </Card>
                </section>

                <section>
                    <SectionTitle id="parallax">Parallax Banner</SectionTitle>
                    <Card className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <ImagePicker name="parallaxImage" label="Background Image" defaultValue={settings.parallaxImage} media={media} />
                        <Field label="Eyebrow" htmlFor="parallaxEyebrow">
                            <Input id="parallaxEyebrow" name="parallaxEyebrow" defaultValue={settings.parallaxEyebrow} />
                        </Field>
                        <Field label="Heading Line 1" htmlFor="parallaxHeadingL1">
                            <Input id="parallaxHeadingL1" name="parallaxHeadingL1" defaultValue={settings.parallaxHeadingL1} />
                        </Field>
                        <Field label="Heading Line 2" htmlFor="parallaxHeadingL2">
                            <Input id="parallaxHeadingL2" name="parallaxHeadingL2" defaultValue={settings.parallaxHeadingL2} />
                        </Field>
                        <Field label="Text" htmlFor="parallaxText">
                            <Textarea id="parallaxText" name="parallaxText" rows={2} defaultValue={settings.parallaxText} />
                        </Field>
                        <Field label="Button Link" htmlFor="parallaxButtonHref">
                            <Input id="parallaxButtonHref" name="parallaxButtonHref" defaultValue={settings.parallaxButtonHref} />
                        </Field>
                    </Card>
                </section>

                <section>
                    <SectionTitle id="newsletter">Newsletter Popup</SectionTitle>
                    <Card className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Checkbox name="newsletterEnabled" label="Show newsletter popup to new visitors" defaultChecked={settings.newsletterEnabled} />
                        <div />
                        <Field label="Heading" htmlFor="newsletterHeading">
                            <Input id="newsletterHeading" name="newsletterHeading" defaultValue={settings.newsletterHeading} />
                        </Field>
                        <ImagePicker name="newsletterImage" label="Image" defaultValue={settings.newsletterImage} media={media} />
                        <Field label="Text" htmlFor="newsletterText">
                            <Textarea id="newsletterText" name="newsletterText" rows={3} defaultValue={settings.newsletterText} />
                        </Field>
                    </Card>
                </section>

                <section>
                    <SectionTitle>Cookie Bar</SectionTitle>
                    <Card className="grid grid-cols-1 gap-4">
                        <Checkbox name="cookieBarEnabled" label="Show cookie notice bar" defaultChecked={settings.cookieBarEnabled} />
                        <Field label="Text" htmlFor="cookieBarText">
                            <Textarea id="cookieBarText" name="cookieBarText" rows={2} defaultValue={settings.cookieBarText} />
                        </Field>
                    </Card>
                </section>

                <section>
                    <SectionTitle>Announcement Bar</SectionTitle>
                    <Card className="grid grid-cols-1 gap-4">
                        <Checkbox name="announcementEnabled" label="Show announcement bar" defaultChecked={settings.announcementEnabled} />
                        <Field label="Text" htmlFor="announcementText">
                            <Input id="announcementText" name="announcementText" defaultValue={settings.announcementText} />
                        </Field>
                    </Card>
                </section>

                <section>
                    <SectionTitle>Homepage Behavior</SectionTitle>
                    <Card className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Best Sellers to Show" htmlFor="bestSellerLimit" hint="Products tagged “Best Seller” are pulled from Products.">
                            <Input id="bestSellerLimit" name="bestSellerLimit" type="number" min="1" max="12" defaultValue={settings.bestSellerLimit} />
                        </Field>
                        <Field label="Currency Symbol" htmlFor="currencySymbol">
                            <Input id="currencySymbol" name="currencySymbol" defaultValue={settings.currencySymbol} />
                        </Field>
                    </Card>
                </section>

                <section>
                    <SectionTitle>SEO Defaults</SectionTitle>
                    <Card className="grid grid-cols-1 gap-4">
                        <Field label="Default Meta Title" htmlFor="seoTitle">
                            <Input id="seoTitle" name="seoTitle" defaultValue={settings.seoTitle} />
                        </Field>
                        <Field label="Default Meta Description" htmlFor="seoDescription">
                            <Textarea id="seoDescription" name="seoDescription" rows={2} defaultValue={settings.seoDescription} />
                        </Field>
                    </Card>
                </section>

                <div>
                    <SubmitButton>Save Settings</SubmitButton>
                </div>
            </form>
        </div>
    )
}

export default AdminSettingsPage
